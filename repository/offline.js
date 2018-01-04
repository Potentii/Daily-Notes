// *Getting the needed modules:
const fs = require('fs');
const path = require('path');
const { app } = require('electron').remote;
const mkdirp = require('mkdirp');
const WeeksRepository = require('./weeks');



const DEFAULT_SAVE_FOLDER = path.join(app.getPath('userData'), 'projects');

let save_folder = DEFAULT_SAVE_FOLDER;

const repositories = new Map([
   ['weeks', new WeeksRepository()]
]);



function load(repository_name){
   return new Promise((resolve, reject) => {
      const repository = repositories.get(repository_name);

      if(!repository)
         return reject(new Error('Repository not found'));

      mkdirp.sync(save_folder);

      fs.readFile(mountRepositoryFile(repository_name), 'utf8', (err, content) => {
         if(err) return reject(err);
         try{
            resolve(repository.parse(content));
         } catch(err){
            reject(err);
         }
      });
   });
}



function save(repository_name, content){
   return new Promise((resolve, reject) => {
      const repository = repositories.get(repository_name);

      if(!repository)
         return reject(new Error('Repository not found'));

      content = repository.stringify(content);

      mkdirp(save_folder, err => {
         if(err) return reject(err);
         fs.writeFile(mountRepositoryFile(repository_name), content, 'utf8', err => {
            if(err) return reject(err);
            resolve();
         });
      });
   });
}



function setSaveFolder(folder){
   save_folder = folder || DEFAULT_SAVE_FOLDER;
}



function getSaveFolder(){
   return save_folder;
}



function mountRepositoryFile(repository_name){
   return save_folder + path.sep + repository_name + '.json';
}



module.exports = {
   DEFAULT_SAVE_FOLDER,
   load,
   save,
   getSaveFolder,
   setSaveFolder
};
