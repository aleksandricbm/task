class AddDeadLineToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :dead_line, :datetime
  end
end
