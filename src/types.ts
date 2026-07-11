/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'home' | 'services' | 'gallery' | 'about' | 'contact' | 'booking' | 'service-details';

export interface Service {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  icon: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  category: 'clinic' | 'patients' | 'tech';
  imageUrl: string;
  description?: string;
}
