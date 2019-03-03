import { Injectable } from '@angular/core';
import config from '../config/config';

@Injectable()

export class Urls {
  public static fileManager = config.server_api +  '/api';

  // Выбрать всех пользователей
  public static accounts = Urls.fileManager + '/account';

  // Авторизация пользователя
  public static authenticate = Urls.accounts + '/authenticate';

  // Регистрация пользователя
  public static register = Urls.accounts + '/register';
}
