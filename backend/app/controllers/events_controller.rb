class EventsController < ApplicationController
  def index
    # イベントデータの一覧を返す
    render json: Event.all
  end

  def show
    # 指定したイベントデータを返す
    render json: Event.find(params[:id])
  end

  def create
    # パラメーターの値でイベントデータを作成する
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  private

  def event_params
    params.require(:event).permit(
      :id,
      :name,
      :start,
      :end,
      :timed,
      :description,
      :color
    )
  end
end
