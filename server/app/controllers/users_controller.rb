 class UsersController < ApplicationController
skip_before_filter :verify_authenticity_token

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render json: {
        users: @users
        }
       }
    end
  end
  def show
    @user = find_user
  end
  def new
    @user = User.new
  end
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to events_path
    else
      render 'new'
    end
  end
  def edit
    @user = find_user
  end
  def update
    @user = find_user
    if @book.update_attributes(user_params)
      redirect_to user_path(@user)
    else
      render 'new'
    end
  end
  def destroy
    @user = find_user
    @user.destroy
    redirect_to root_path
  end

  private
  def find_user
    User.find(params[:id])
  end
  def user_params
    params.require(:user).permit(:name, :image, :provider, :uid, :oauth_token, :oauth_expires_at)
  end

end
