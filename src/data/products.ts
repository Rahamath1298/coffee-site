export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

export const categories = ['All', 'Single Origin', 'Blend', 'Espresso', 'Decaf'];

export const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Single Origin',
    price: 18.50,
    weight: '250g',
    roast: 'Light',
    description: 'A bright and complex coffee from the birthplace of coffee. Grown at elevations above 1,800m in the Yirgacheffe region, this lot showcases the terroir with remarkable clarity.',
    notes: ['Jasmine', 'Bergamot', 'Peach', 'Honey'],
    image: '🇪🇹',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Single Origin',
    price: 16.00,
    weight: '250g',
    roast: 'Medium',
    description: 'Sourced from small farms in the Huila department, this Supremo grade coffee delivers a perfectly balanced cup with sweet caramel undertones and a velvety body.',
    notes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Walnut'],
    image: '🇨🇴',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Midnight Harmony Blend',
    origin: 'Brazil & Guatemala',
    category: 'Blend',
    price: 15.00,
    weight: '250g',
    roast: 'Dark',
    description: 'Our signature dark roast blend combines the chocolate richness of Brazilian Santos with the smoky depth of Guatemalan Antigua beans for a bold, full-bodied experience.',
    notes: ['Dark Chocolate', 'Smoky', 'Molasses', 'Roasted Almond'],
    image: '🌙',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Velvet Espresso',
    origin: 'Multi-Origin',
    category: 'Espresso',
    price: 17.50,
    weight: '250g',
    roast: 'Medium-Dark',
    description: 'Crafted specifically for espresso extraction, this blend produces a thick, syrupy shot with a persistent crema. Perfect for milk-based drinks or a rich straight espresso.',
    notes: ['Hazelnut', 'Brown Sugar', 'Cocoa', 'Dried Fig'],
    image: '☕',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Morning Ritual Blend',
    origin: 'Ethiopia & Kenya',
    category: 'Blend',
    price: 16.50,
    weight: '250g',
    roast: 'Medium',
    description: 'An uplifting blend that combines the fruity brightness of Ethiopian naturals with the juicy acidity of Kenyan AA beans. Your perfect morning companion.',
    notes: ['Blueberry', 'Citrus', 'Brown Sugar', 'Floral'],
    image: '🌅',
    rating: 4.7,
  },
  {
    id: 6,
    name: 'Twilight Decaf',
    origin: 'Mexico',
    category: 'Decaf',
    price: 17.00,
    weight: '250g',
    roast: 'Medium',
    description: 'Swiss Water Process decaffeinated coffee from the Sierra Norte of Oaxaca. All the flavor, none of the caffeine — perfect for your evening ritual.',
    notes: ['Toffee', 'Vanilla', 'Toasted Almond', 'Cinnamon'],
    image: '🌿',
    rating: 4.5,
  },
];
