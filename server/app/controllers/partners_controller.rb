class PartnersController < ApplicationController
  def index
    @partners = Partner.all
    respond_to do |format|
      format.html
      format.json { render json: {
        partners: @partners
      }
    }
    end
  end
  def show
    @partner = find_partner
    respond_to do |format|
      format.html
      format.json { render json: {
        partner: @partner
      }
    }
    end
  end

  def new
    @partner = Partner.new
  end
  def create
    @partner = Partner.new(partner_params)
    if @partner.save
      redirect_to partner_path(@partner)
    else
      render 'new'
    end
  end

  def edit
    @partner = Partner.find
  end
  def update
    @partner = Partner.find
    if @partner.udpate_attributes(partner_params)
      redirect_to partner_path(@partner)
    else
      render 'new'
    end
  end
  def destroy
    @partner = find_partner
    @partner.destory
    redirect_to events_path
  end
  private
  def find_partner
    Partner.friendly.find(params[:id])
  end
  def find_partner_by_slug
    Partner.friendly.find(params[:slug])
  end
  def partner_params
    params.require(:partner).permit(:name, :email, :image_url, :organization, :type)
  end
end
