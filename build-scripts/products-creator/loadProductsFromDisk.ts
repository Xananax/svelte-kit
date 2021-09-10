// TODO: Derive those from real courses, maybe in their YAML

export const loadProductsFromDisk = async (): Promise<UploadableProduct[]> => [
  {
    product: {
      name: 'Free course',
      description: 'Learn cool stuff'
    },
    price: {
      currency: 'usd',
      unit_amount: 0,
      recurring: {
        interval: 'month' as const
      }
    },
    includes: ['The basic Godot course', 'The better Godot course', 'Infinite button clicks']
  },
  {
    product: {
      name: 'Best Course',
      description: 'A very cool course'
    },
    price: {
      currency: 'usd',
      unit_amount: 1000,
      recurring: {
        interval: 'month' as const
      }
    },
    includes: ['How to make games', 'Paying money', '200 fresh random numbers']
  },
  {
    product: {
      name: 'Infinite Course',
      description: 'Its infinite'
    },
    price: {
      currency: 'usd',
      unit_amount: 1500,
      recurring: {
        interval: 'month' as const
      }
    },
    includes: [
      'All of the best course',
      'A bestest course',
      'Infinite course',
      'Potatoes',
      'Pay more'
    ]
  }
]
