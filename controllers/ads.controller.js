const Advertisement = require('../models/Advertisement.model');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  
  try {
    res.json(await Advertisement.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.addAd = async (req, res) => {

  try {

    const { title, description, publicDate, price, location, info } = req.body;
    console.log(req.body)

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    if(
      title 
      && description 
      && publicDate 
      && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) 
      && price 
      && location 
      && info) {
      const newAd = await Advertisement.create({title, description, publicDate, image: req.file.filename, price, location, info})

      res.status(200).send({message: 'Advertisement has been added!' + newAd})
    } else {
      if(req.file) {
        fs.unlinkSync(`./public/uploads//${req.file.filename}`);
      }

      res.status(400).send({message: 'Bad request'})
    }

  } catch(err) {
    res.status(500).json({message: err});
  };
}

exports.getById =  async (req,  res) =>  {
  try {
    const adv =  await Advertisement.findById(req.params.id);
    if(!adv) res.status(404).json({message: 'Not Found!'});
    else res.json(adv)
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.Delete = async (req, res) => {
  try  {
    const adv = await Advertisement.findById(req.params.id);
    if(adv) {
      await Advertisement.deleteOne({ _id: req.params.id });
      res.json({
        message: 'OK!',
        deletedFile: Advertisement
      });
    }
    else res.status(404).json({message: err});
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.Edit = async(req,res) => {
  const { title, description, publicDate, price, location, info } = req.body;

  try  {
    const adv = await Advertisement.findById(req.params.id);
    if(adv) {
      adv.title = title;
      adv.description = description;
      adv.publicDate = publicDate;
      adv.price = price;
      adv.location = location;
      adv.info = info;
      if(req.file) {
        adv.image = req.file.filename
      }
      await adv.save();
      res.json({
        message: 'OK!',
        editedFile: adv
      });
    } else res.status(404).json({message: 'Not Found!'})

  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.Search = async(req, res) => {
  
  try {
    const phrase = req.params.id;
    const adv = await Advertisement.find( { title: { $regex: phrase, $options: "imxs" }})
    res.json({
      file: adv
    });
  } catch(err) {
    res.status(500).json({message: err});
  };
}