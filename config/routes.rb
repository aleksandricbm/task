Rails.application.routes.draw do
  resources :tasks
  devise_for :users
  resources :projects
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'projects#index'
  post '/projects/create'=> 'projects#create'
  post '/projects/save_edit_project' => 'projects#save_edit_project'
  post '/tasks/create' => 'tasks#create'
  post '/tasks/save_edit_task' => 'tasks#save_edit_task'
  post '/tasks/priority' => 'tasks#priority'
end
