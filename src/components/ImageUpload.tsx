
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  folder: string;
}

const ImageUpload = ({ currentImage, onImageChange, folder }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Please select an image to upload');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('contents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('contents')
        .getPublicUrl(fileName);

      onImageChange(data.publicUrl);
      toast({ title: 'Success', description: 'Image uploaded successfully' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onImageChange('');
  };

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
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
        <Button type="button" disabled={uploading} className="rounded-2xl">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
