"use client";

import { useState, useEffect } from 'react';
import { databases, storage, appwriteConfig } from '../../lib/appwrite';
import { ID, Query } from 'appwrite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Define the product schema
const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Product {
    $id: string;
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

export default function AdminPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema)
    });

    useEffect(() => {
        // Check for admin authorization
        const checkAuth = () => {
            const adminKey = localStorage.getItem('adminKey');
            if (adminKey !== 'fugo101') {
                router.push('/');
                return;
            }
            setIsAuthorized(true);
            fetchProducts();
        };

        checkAuth();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.productsCollectionId
            );
            console.log('✅ Products fetched successfully:', response);
            setProducts(response.documents as unknown as Product[]);
        } catch (error: any) {
            console.error('❌ Error fetching products:', error);
            toast.error('Failed to fetch products. Please check your Appwrite configuration.');
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        try {
            setIsLoading(true);
            console.log('📝 Submitting product data:', data);

            let imageUrl = '';
            if (selectedFile) {
                try {
                    console.log('🖼️ Uploading image...');
                    const fileUpload = await storage.createFile(
                        appwriteConfig.storageId,
                        ID.unique(),
                        selectedFile
                    );
                    imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.storageId}/files/${fileUpload.$id}/view?project=67b6273400341a9582d9`;
                    console.log('✅ Image uploaded successfully');
                } catch (fileError: any) {
                    console.error('❌ File upload error:', fileError);
                    toast.error('Failed to upload image. Please try again.');
                    setIsLoading(false);
                    return;
                }
            }

            if (editingProduct) {
                try {
                    console.log('📝 Updating existing product...');
                    await databases.updateDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.productsCollectionId,
                        editingProduct.$id,
                        {
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            imageUrl: imageUrl || editingProduct.imageUrl,
                        }
                    );
                    console.log('✅ Product updated successfully');
                    toast.success('Product updated successfully');
                } catch (updateError: any) {
                    console.error('❌ Product update error:', updateError);
                    toast.error('Failed to update product. Please try again.');
                    setIsLoading(false);
                    return;
                }
            } else {
                try {
                    console.log('📝 Creating new product...');
                    const newProduct = await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.productsCollectionId,
                        ID.unique(),
                        {
                            name: data.name,
                            price: data.price,
                            description: data.description,
                            imageUrl,
                        }
                    );
                    console.log('✅ Product created successfully:', newProduct);
                    toast.success('Product created successfully');
                } catch (createError: any) {
                    console.error('❌ Product creation error:', createError);
                    toast.error('Failed to create product. Please try again.');
                    setIsLoading(false);
                    return;
                }
            }

            reset();
            setSelectedFile(null);
            setEditingProduct(null);
            await fetchProducts();
        } catch (error: any) {
            console.error('❌ General error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (productId: string) => {
        try {
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.productsCollectionId,
                productId
            );
            toast.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        reset({
            name: product.name,
            price: product.price,
            description: product.description,
        });
    };

    if (!isAuthorized) {
        return null; // or return a loading state
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center tracking-tight">
                    Product Management
                </h1>

                {/* Product Form */}
                <div className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg mb-8 sm:mb-12 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-gray-900 font-normal placeholder-gray-500"
                                placeholder="Enter product name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                            <input
                                type="text"
                                {...register('price')}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-gray-900 font-normal placeholder-gray-500"
                                placeholder="Enter price"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-2">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                {...register('description')}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-gray-900 font-normal placeholder-gray-500 min-h-[120px]"
                                placeholder="Enter product description"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                            <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-all duration-200">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <input
                                            type="file"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="relative w-full cursor-pointer rounded-md font-medium text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-2 hover:text-gray-800"
                                            accept="image/*"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:flex-1 bg-[#333333] text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {isLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                            </button>

                            {editingProduct && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingProduct(null);
                                        reset();
                                    }}
                                    className="w-full sm:flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Products List */}
                <div className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Products List</h2>
                            <p className="text-gray-600">
                                Total Products: <span className="font-semibold text-[#333333]">{products.length}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                            <select
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
                                onChange={(e) => {
                                    // Sorting functionality will be implemented later
                                    console.log('Sort by:', e.target.value);
                                }}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {products.map((product) => (
                            <div key={product.$id} className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                                {product.imageUrl && (
                                    <div className="relative h-48 sm:h-64 overflow-hidden">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">₦{product.price}</p>
                                    <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-2">{product.description}</p>
                                    <div className="flex gap-2 sm:gap-3">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 bg-[#333333] text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.$id)}
                                            className="flex-1 bg-red-50 text-red-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 