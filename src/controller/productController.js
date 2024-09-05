const db = require("../modules/mainModels");

const mysql = require("mysql");
const { Op } = require('sequelize'); // Ensure you're using Sequelize


const Products = db.products;

const createProductDetails = async function (req, res) {
    try {
      let data = req.body;
    const { productId,
        productName,
        productImageName,
        productImageURL,
        brandName,
        description,
        itemCode,
        itemType,
        currency,
        currencyCode,
        saleAmount,
        brochureFileName,
        brochureFileURL} = data;
    
    
    let productCreate = await Products.create(data);
    res.status(201).send({
      status: true,
      message: "data create successfully",
      data: productCreate,
    });
    console.log("productCreate",productCreate)
    } catch (error) {
      res.status(500).send({ status: false, error: error.message });
      
    }
  };



const getAllProductandPeginationFeature = async (req, res) => {
    let {
        productName = '', // Default values
        currentPage = 1,
        pageSize = 10,
        orderBy = 'createdAt',
        orderDir = 'desc',
        searchBy = '',
        searchFields = []
    } = req.query;

    // Convert currentPage and pageSize to integers
    currentPage = parseInt(currentPage, 10);
    pageSize = parseInt(pageSize, 10);

    // Ensure valid values for order direction
    if (orderDir !== 'asc' && orderDir !== 'desc') {
        orderDir = 'desc';
    }

    // Prepare search criteria if searchFields are provided
    let searchCriteria = {};
    if (searchBy && searchFields.length) {
        searchCriteria = {
            [Op.or]: searchFields.map(field => ({
                [field]: {
                    [Op.iLike]: `%${searchBy}%`
                }
            }))
        };
    }

    try {
        // Fetch products with pagination, ordering, and search
        const { count, rows } = await Products.findAndCountAll({
            where: {
                ...searchCriteria,
                productName: {
                    [Op.iLike]: `%${productName}%`
                }
            },
            order: [[orderBy, orderDir]],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize
        });

        return res.status(200).send({
            message: 'Products retrieved successfully',
            data: rows,
            totalCount: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage
        });
    } catch (error) {
        return res.status(500).send({ message: 'Error retrieving products', error });
    }
};



const getAllProduct = async (req, res) => {
    let {
        productName = '', // Default value for productName
        currentPage = 1,
        pageSize = 10,
        orderBy = 'createdAt',
        orderDir = 'desc',
        searchBy = '',
        searchFields = []
    } = req.query;

    // Convert currentPage and pageSize to integers
    currentPage = parseInt(currentPage, 10);
    pageSize = parseInt(pageSize, 10);

    // Ensure valid values for order direction
    if (orderDir !== 'asc' && orderDir !== 'desc') {
        orderDir = 'desc';
    }

    // Prepare search criteria based on searchFields
    let searchCriteria = {};
    if (searchBy) {
        if (searchFields.length > 0) {
            searchCriteria = {
                [Op.or]: searchFields.map(field => ({
                    [field]: {
                        [Op.iLike]: `%${searchBy}%`
                    }
                }))
            };
        } else {
            // If no searchFields are provided, search in all fields
            searchCriteria = {
                [Op.or]: [
                    { productName: { [Op.iLike]: `%${searchBy}%` } },
                    { description: { [Op.iLike]: `%${searchBy}%` } },
                    // Add other fields if necessary
                ]
            };
        }
    }

    try {
        // Fetch products with pagination, ordering, and filtering
        const { count, rows } = await Products.findAndCountAll({
            attributes: [
                'productId',
                'productName',
                'productImageName',
                'productImageURL',
                'brandName',
                'description',
                'itemCode',
                'itemType',
                'currency',
                'currencyCode',
                'saleAmount',
                'brochureFileName',
                'brochureFileURL',
                'vendors',
                'status',
                'createdBy',
                'created',
                'updated',
                'subCategoryId',
                'categoryId',
                'uomId',
                'shippingMethodId',
                'shippingTermsId',
                'paymentTermsId',
                'categoryName',
                'subCategoryName',
                'uomCode',
                'uomDescription',
                'organisationName',
                'organisationId',
                'vendorInfo'
            ],
            where: {
                ...searchCriteria,
                productName: {
                    [Op.iLike]: `%${productName}%`
                }
            },
            order: [[orderBy, orderDir]],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize
        });

        return res.status(200).send({
            currentPage,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            totalCount: count,
            data: rows
        });
    } catch (error) {
        return res.status(500).send({ message: 'Error retrieving products', error });
    }
};

  module.exports={createProductDetails,getAllProductandPeginationFeature,getAllProduct}