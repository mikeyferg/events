 class UsersController < ApplicationController
skip_before_filter :verify_authenticity_token

  def me
    if request.headers.include?('HTTP_AUTHORIZATION')
      @user = User.find_by(oauth_token: request.headers['HTTP_AUTHORIZATION'])
      render json: {user: @user}
    else
      render json: {error: "Not found user"}
    end
  end

  def index
    if params[:filter]
      @users = User.find_by(oauth_token: params[:filter][:oauth_token])
    else
      @users = User.all
    end
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
  #  @events = @user.events
    respond_to do |format|
      format.html
      format.json { render json: {
        user: @user#,
        #events: @events
        }
       }
    end
  end
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(uid: user_params[:uid])
    if @user
      render json: {user: @user}
    else
      @user = User.new(user_params)
       if @user.save
         render json: {user: @user}
       else
         render json: { error: "Can't create a user" }
       end
    end
  end

  def edit
    @user = find_user
    @events = @user.events
    respond_to do |format|
      format.html
      format.json { render json: {
        user: @user,
        events: @events
        }
       }
    end
  end
  def update
    @user = find_user
    if @book.update_attributes(user_params)
      redirect_to user_path(@user)
    else
      render 'new'
    end
  end
  # def destroy
  #   @user = find_user
  #   @user.destroy
  #   redirect_to root_path
  # end

  private
  def find_user
    User.friendly.find(params[:id])
  end
  def user_params
    params.require(:user).permit(:name, :email, :image, :oauth_token, :uid)
  end

end
