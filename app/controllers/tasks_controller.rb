class TasksController < ApplicationController
  before_filter :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    #@task = Task.new(params[:task_params])
    @task = Task.new(task_params)
    #@temp=Task.find_by(project_id: params[:project_id]) #.all.order(:priority)
    max = Task.where(project_id: task_params[:project_id]).maximum(:priority)
    @task.priority=max.to_i.next

    respond_to do |format|
      if @task.save
        

#        @temp.each do |t|
#          @temp.priority=(@temp.priority+1)
#          @temp.save
        #end


        #format.html { redirect_to @task, notice: 'Task was successfully created.' }
        #format.html { render "_line", :locals => { :task => @task } }
        
        #format.json { render :show, location: @task}
      #format.json { render json: @task, status: :created, location: @task }
      format.html {render :partial => "tasks/line", :locals => { :task => @task } , status: :created}
      #format.json { render json: @task} #, status: :created, location: @task }
        #render :partial => "tasks/line", :locals => { :task => @task }  
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def priority
    @t=Task.find(params[:id])
    if params[:typ]=='up'
      @temp=Task.find_by(project_id: @t.project_id, priority: (@t.priority-1))
      @temp.priority=(@t.priority)
      if @temp.save
        @t.priority= (@t.priority-1)
        @t.save
      end
    end

    if params[:typ]=='down'
      @temp=Task.find_by(project_id: @t.project_id, priority: (@t.priority+1))
      @temp.priority=(@t.priority)
      if @temp.save
        @t.priority= (@t.priority+1)
        @t.save
      end
    end
  end

    def save_edit_task
      #client_id = params[:id]
      @task = Task.find(params[:id])
      #if @project.valid_get?
      @task.update_attribute(:name, params[:text])
      
      render :text => @task.name
      #end 
         #respond_to do |format|
          #format.html { notice: 'Project was successfully update.'+ params[:text] }
          #format.json { head :no_content }
    #end 
    end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update

    if @task.update(task_params)
      render :text => 'ok'
    else
      render 'edit'
    end
    #respond_to do |format|
    #  if @task.update(task_params)
    #    render :text => 'ok'
    #    #format.json { render :show, status: :ok, location: @task }
    #    format.json { head :no_content }
    #  else
    #    format.html { render :edit }
    #    format.json { render json: @task.errors, status: :unprocessable_entity }
    #  end
    #end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      #format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :status, :project_id, :priority, :dead_line)
    end
end
