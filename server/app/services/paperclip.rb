module Paperclip
#  class Attachment
      # Clears out the attachment. Has the same effect as previously assigning
      # nil to the attachment. Does NOT save. If you wish to clear AND save,
      # use #destroy.
      def clear
        queue_existing_for_delete
        @errors            = {}
      end

      # Destroys the attachment. Has the same effect as previously assigning
      # nil to the attachment *and saving*. This is permanent. If you wish to
      # wipe out the existing attachment but not save, use #clear.
      def destroy
        clear
        save
      end
    #end
  end
