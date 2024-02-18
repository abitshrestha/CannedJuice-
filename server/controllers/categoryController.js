import slugify from 'slugify';
import {Category} from '../models/Category.js';

const createCategoryController=async(req,res,next)=>{
    const {name}=req.body;
    if(!name || typeof name!=='string' || name.trim()===''){
        return res.status(400).json({error:'Invalid category name provided!'});
    }
    const slug=slugify(name);
    try {
        //already added category
        const preExistCategory=await Category.findOne({slug});
        if(preExistCategory){
            return res.status(409).json({error:'Category already exists!'});
        }
        const category=new Category({name,slug});
        await category.save();
        res.status(201).json({
            success:true,
            message:'Category added successfully!',
            category,
        });
    } catch (error) {
        next(error);
    }
}

const updateCategoryController=async(req,res,next)=>{
    const {name}=req.body;
    if(!name || typeof name!=='string' || name.trim()===''){
        return res.status(400).json({error:'Invalid category name provided!'});
    }
    try {
        //find category to update and update
        const category=await Category.findByIdAndUpdate(req.params.id,{name,slug:slugify(name)},{new:true});
        res.status(200).json({
            success:true,
            message:'Category updated successfully!',
            category,
        });
    } catch (error) {
        next(error);
    }
}

const categoryController=async(req,res,next)=>{
    try {
        const categories=await Category.find({});
        res.status(200).json({
            success:true,
            message:'All Category Lists',
            categories,
        });
    } catch (error) {
        next(error);
    }
}

const singleCategoryController=async(req,res,next)=>{
    try {
        const category=await Category.findOne({slug:req.params.slug});
        res.status(200).json({
            success:true,
            message:'Single Category',
            category,
        });
    } catch (error) {
        next(error);
    }
}

const deleteCategoryController=async(req,res,next)=>{
    try {
        const category=await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:'Deleted Category',
            category,
        });
    } catch (error) {
        next(error);
    }
}

export {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController};
