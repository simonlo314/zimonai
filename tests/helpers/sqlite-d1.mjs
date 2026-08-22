import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

class SqliteD1Statement {
  constructor(statement, owner) {
    this.statement = statement;
    this.owner = owner;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    this.owner.recordQuery(this.values.length);
    return this.statement.get(...this.values) || null;
  }

  async all() {
    this.owner.recordQuery(this.values.length);
    return { results: this.statement.all(...this.values) };
  }

  async run() {
    this.owner.recordQuery(this.values.length);
    const result = this.statement.run(...this.values);
    return { meta: { changes: Number(result.changes || 0), last_row_id: Number(result.lastInsertRowid || 0) } };
  }
}

export class SqliteD1 {
  constructor() {
    this.queryCount = 0;
    this.maxBoundParameters = 0;
    this.raw = new DatabaseSync(':memory:');
    this.raw.exec('PRAGMA foreign_keys = ON');
    for (const migration of [
      '0001_portal.sql',
      '0002_portal_oauth_rate_limit.sql',
      '0003_workflow.sql',
      '0004_admin_workflow.sql',
      '0005_identity_email_authority.sql',
      '0006_order_lifecycle.sql',
      '0007_case_archive.sql'
    ]) {
      this.raw.exec(readFileSync(new URL(`../../migrations-portal/${migration}`, import.meta.url), 'utf8'));
    }
  }

  prepare(sql) {
    return new SqliteD1Statement(this.raw.prepare(sql), this);
  }

  recordQuery(boundParameters) {
    this.queryCount += 1;
    this.maxBoundParameters = Math.max(this.maxBoundParameters, Number(boundParameters || 0));
  }

  resetMetrics() {
    this.queryCount = 0;
    this.maxBoundParameters = 0;
  }

  async batch(statements) {
    this.raw.exec('BEGIN IMMEDIATE');
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      this.raw.exec('COMMIT');
      return results;
    } catch (error) {
      this.raw.exec('ROLLBACK');
      throw error;
    }
  }

  close() {
    this.raw.close();
  }
}
