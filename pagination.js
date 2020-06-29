//an example of pagination of products from the Product Schema
const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find({
      productType: req.params.type,
      active: true,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.find({
      productType: req.params.type,
      active: true,
    }).countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }