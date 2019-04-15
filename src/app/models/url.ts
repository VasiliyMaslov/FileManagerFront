import { Injectable } from '@angular/core';
import config from '../config/config';

@Injectable()

export class Urls {
  public static fileManager = config.server_api +  '/api';

  public static catalog = Urls.fileManager + '/catalog';

  // Users
  // Выбрать всех пользователей
  public static accounts = Urls.fileManager + '/account';

  // Авторизация пользователя
  public static authenticate = Urls.accounts + '/authenticate';

  // Регистрация пользователя
  public static register = Urls.accounts + '/register';

  // Objects
  // Загрузка файла
  public static upload = Urls.catalog + '/upload_file';

  // Скачивание файла
  public static download =  Urls.catalog + '/download';

  // Создание директории
  public static createDirectory = Urls.catalog + '/create_directory';

  // Перемещение объекта
  public static moveObject = Urls.catalog + '/relocate';

  // Переименование объекта
  public static renameObject = Urls.catalog + '/rename';

  // Удаление объекта
  public static deleteObject = Urls.catalog + '/delete';

  // Добавление прав пользователям
  public static addPermissions = Urls.catalog + '/add_permission';

  // Получение директории
  public static getDirectories = Urls.catalog + '/get_objects';

  // Список пользователей, имеющих доступ к объекту
  public static allowedUsers = Urls.catalog + '/added_users';

  // Снятие прав с пользователя
  public static removePermission = Urls.catalog + '/remove_permissions';

  // Информация о использованном и доступном месте в хранилище
  public static checkStorageSize = Urls.catalog + '/storage_size';

  // Расшаренные объекты
  public static sharedObjects = Urls.catalog + '/shared_objects';
}
