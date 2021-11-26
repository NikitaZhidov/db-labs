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
