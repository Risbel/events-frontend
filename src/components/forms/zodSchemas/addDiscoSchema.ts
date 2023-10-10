import { z } from 'zod'

export const addDiscoSchema = z.object({
  name: z.string().min(1, { message: 'The name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  phone: z.string().min(8, { message: 'Phone must be atleast 8 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
  largeDescription: z
    .string()
    .min(1, { message: 'Large description is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  administrator: z
    .string()
    .min(1, { message: 'Field must be atleast 8 characters' }),
  logo: z.string().min(1, { message: 'Logo is required' }),
  bgImage: z.string().min(1, { message: 'Background is required' }),
})
