json.extract! task, :id, :name, :status, :project_id, :priority, :created_at, :updated_at
json.url task_url(task, format: :json)