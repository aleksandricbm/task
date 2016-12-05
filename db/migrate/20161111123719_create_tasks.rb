class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :status
      t.integer :project_id
      t.integer :priority

      t.timestamps
    end
  end
end
