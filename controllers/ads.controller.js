const Advertisement = require('../models/Advertisement.model');

exports.getAll = async (req, res) => {
  
  try {
    res.json(await Advertisement.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.addAd = async (req, res) => {
  try {
    const { title, description, publicDate, image, price, location, info } = req.body;
    const newAd = new Advertisement({title, description, publicDate, image, price, location, info});

    await newAd.save();
    res.json({ message:  'OK!'});
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
  const { title, description, publicDate, image, price, location, info } = req.body;

  try  {
    const adv = await Advertisement.findById(req.params.id);
    if(adv) {
      adv.title = 'Edited: ' + title;
      adv.description = 'Edited: ' + description;
      adv.publicDate = 'Edited: ' + publicDate;
      adv.image = image;
      adv.price = price;
      adv.location = location;
      adv.info = 'Edited: ' + info;
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