
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string | undefined) => void;
  folder: string;
}

const ImageUpload = ({ currentImage, onImageChange, folder }: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputegerElement>) => {
    try {
      setUploading(true);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'File size must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Error',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('contents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('contents').getPublicUrl(fileName);
      
      onImageChange(data.publicUrl);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onImageChange(undefined);
  };

  return (
    <div className="space-y-4">
      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-2xl border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No image selected</p>
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          className="rounded-2xl"
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          className="rounded-2xl"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
