export class RedisDBConfig {
  static _config = {
    username: '',
    password: '',
    host: 'localhost',
    port: 6379,
  };

  static get connectionString() {
    return `redis://${this._config.username}:${this._config.password}@${this._config.host}:${this._config.port}`;
  }
}

export class MongoDbConfig {
  static _config = {
    username: '',
    password: '',
    host: 'localhost',
    port: '27017',
    database: 'db-task',
  };

  static get connectionString() {
    return `mongodb://${this._config.host}:${this._config.port}/${this._config.database}`;
  }
}
