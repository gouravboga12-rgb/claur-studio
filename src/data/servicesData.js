export const servicesData = [
  { 
    id: 1, 
    name: 'Residential Interiors', 
    description: 'Complete bespoke home design solutions for 1BHK, 2BHK, 3BHK and above.', 
    space_type: '2BHK', 
    package: 'Standard', 
    style: 'Modern', 
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
    formFields: [
      { name: 'property_type', label: 'Property Type', type: 'select', options: ['1BHK', '2BHK', '3BHK', '4BHK', 'Villa', 'Other'] },
      { name: 'possession_status', label: 'Possession Status', type: 'select', options: ['Already Possessed', 'Within 3 Months', '3-6 Months', 'More than 6 Months'] },
      { name: 'scope_of_work', label: 'Scope of Work', type: 'select', options: ['Full Home Interior', 'Only Kitchen & Wardrobes', 'Living Room Only', 'Bedroom Only'] }
    ]
  },
  { 
    id: 2, 
    name: 'Luxury Villa Suite', 
    description: 'Premium interior architecture for grand villas and independent houses.', 
    space_type: 'Villa', 
    package: 'Premium', 
    style: 'Luxury', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    formFields: [
      { name: 'villa_type', label: 'Villa Type', type: 'select', options: ['Duplex', 'Triplex', 'Penthouse', 'Independent House'] },
      { name: 'plot_area', label: 'Plot Area (sqft)', type: 'number' },
      { name: 'luxury_addons', label: 'Luxury Add-ons', type: 'checkbox', options: ['Home Theatre', 'Smart Home Automation', 'False Ceiling Design', 'Custom Lighting'] }
    ]
  },
  { 
    id: 3, 
    name: 'Executive Office', 
    description: 'Inspiring and functional corporate environments for modern businesses.', 
    space_type: 'Office', 
    package: 'Standard', 
    style: 'Minimal', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    formFields: [
      { name: 'office_type', label: 'Office Type', type: 'select', options: ['Corporate Office', 'Co-working Space', 'Start-up Hub', 'Clinic/Studio'] },
      { name: 'seating_capacity', label: 'Seating Capacity', type: 'number' },
      { name: 'meeting_rooms', label: 'Number of Meeting Rooms', type: 'number' }
    ]
  },
  { 
    id: 4, 
    name: 'Gourmet Kitchen', 
    description: 'State-of-the-art modular kitchen systems with premium finishes.', 
    space_type: 'All', 
    package: 'Basic', 
    style: 'Modern', 
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    formFields: [
      { name: 'kitchen_layout', label: 'Kitchen Layout', type: 'select', options: ['L-Shaped', 'U-Shaped', 'Straight', 'Island', 'Parallel'] },
      { name: 'material_preference', label: 'Material Preference', type: 'select', options: ['Acrylic', 'Laminate', 'Glass Finish', 'UV Finish'] },
      { name: 'appliances_needed', label: 'Appliances Needed', type: 'checkbox', options: ['Chimney', 'Hob', 'Oven', 'Dishwasher'] }
    ]
  }
];
