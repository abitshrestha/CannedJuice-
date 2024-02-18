import slugify from "slugify";
import FruitJuice from "../models/FruitJuice.js";
import fs from 'fs';

const createfruitJuiceController = async (req, res, next) => {
    const { name, description, price, quantity, category, shipping } = req.fields;
    const { photo } = req.files;

    //validation
    if (!name) return res.status(400).json({ error: 'Name is required!' });
    if (!description) return res.status(400).json({ error: 'Description is required!' });
    if (!price) return res.status(400).json({ error: 'Price is required!' });
    if (!quantity) return res.status(400).json({ error: 'Quantity is required!' });
    if (!shipping) return res.status(400).json({ error: 'Shipping is required!' });
    if (!category) return res.status(400).json({ error: 'Category is required!' });

    try {
        const fruitJuice = new FruitJuice({ name, description, price, quantity, shipping, category, slug: slugify(name) });
        if (photo) {
            //readFileSync reads the binary data of the file specified 
            fruitJuice.photo.data = fs.readFileSync(photo.path);
            fruitJuice.photo.contentType = photo.type;
        }
        await fruitJuice.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully!',
            fruitJuice,
        });
    } catch (error) {
        next(error);
    }
}

const getfruitJuiceController = async (req, res, next) => {
    try {
        //remove photo,insert category from id,restricting no. of documents i.e 12 & showing from latest added
        const fruitJuices = await FruitJuice.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'All Products',
            fruitJuices,
        });
    } catch (error) {
        next(error);
    }
}

const getSinglefruitJuiceController = async (req, res, next) => {
    try {
        const fruitJuice = await FruitJuice.findOne({ slug: req.params.slug }).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).json({
            sucess: true,
            message: 'Single FruitJuice',
            fruitJuice,
        });
    } catch (error) {
        next(error);
    }
}

const fruitJuicePhotoController = async (req, res, next) => {
    try {
        const fruitJuice = await FruitJuice.findById(req.params.pid).select('photo');
        if (fruitJuice.photo.data) {
            res.set('Content-Type', fruitJuice.photo.contentType);
            return res.status(200).send(fruitJuice.photo.data);
        }
    } catch (error) {
        next(error);
    }
}

const updatefruitJuiceController = async (req, res, next) => {
    const { name, description, slug, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    //validation
    if (!name) return res.status(400).json({ error: 'Name is required!' });
    if (!description) return res.status(400).json({ error: 'Description is required!' });
    if (!price) return res.status(400).json({ error: 'Price is required!' });
    if (!quantity) return res.status(400).json({ error: 'Quantity is required!' });
    if (!shipping) return res.status(400).json({ error: 'Shipping is required!' });
    if (!category) return res.status(400).json({ error: 'Category is required!' });

    try {
        const fruitJuice=await FruitJuice.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true});
        if(!fruitJuice){
            return res.status(404).json({
                success:false,
                message:'Product not found!',
            });
        }
        if(photo){
            fruitJuice.photo.data=fs.readFileSync(photo.path);
            fruitJuice.photo.contentType=photo.type;
        }
        await fruitJuice.save();
        res.status(200).json({
            success:true,
            message:'Product Upated Successfully!',
            fruitJuice,
        });
    } catch (error) {
        next(error);
    }
}

const deletefruitJuiceController=async(req,res,next)=>{
    try{
        const fruitJuice=await FruitJuice.findByIdAndDelete(req.params.id).select('-photo');
        res.status(200).send({
            success:false,
            message:'Product deleted successfully!',
        });
    }catch(error){
        next(error);
    }
}

const fruitJuiceCountController=async(req,res,next)=>{
    try {
        const total=await FruitJuice.find({}).estimatedDocumentCount();
        res.status(200).json({
            success:true,
            total,
        });
    } catch (error) {
        next(error);
    }
}

const fruitJuiceListController=async(req,res,next)=>{
    try {
        const perPage=2;
        const page=req.params.page?req.params.page:1;
        const fruitJuices=await FruitJuice.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).json({
            success:true,
            fruitJuices,
        });
    } catch (error) {
        next(error);
    }
}

export { createfruitJuiceController, getfruitJuiceController, getSinglefruitJuiceController, fruitJuicePhotoController,deletefruitJuiceController,fruitJuiceCountController,updatefruitJuiceController,fruitJuiceListController};