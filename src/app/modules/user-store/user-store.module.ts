import { NgModule } from '@angular/core';
import { UserStoreComponent } from './components/user-store/user-store.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { AvailableStorageComponent } from './components/available-storage/available-storage.component';
import { StorageBarComponent } from './components/storage-bar/storage-bar.component';
import { ObjectCardComponent } from './components/object-card/object-card.component';
import { ModalCreateDirectoryComponent } from './components/modal-create-directory/modal-create-directory.component';
import { ModalUploadFileComponent } from './components/modal-upload-file/modal-upload-file.component';

@NgModule({
  declarations: [
    UserStoreComponent,
    AvailableStorageComponent,
    StorageBarComponent,
    ObjectCardComponent,
    ModalCreateDirectoryComponent,
    ModalUploadFileComponent
  ],
  imports: [
    SharedModule,
    AuthorizationModule
  ],
  entryComponents: [
    ModalUploadFileComponent,
    ModalCreateDirectoryComponent
  ]
})
export class UserStoreModule { }
