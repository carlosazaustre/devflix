const express = require('express');

function videosApi(app) {
  const router = express.Router();

  app.use('/api/videos', router);

  router.get('/', (req, res, next) => {
    const { tags } = req.query;

    res.status(200).json({
      data: tags,
      message: 'videos listed'
    });
  });

  router.get('/:videoId', (req, res, next) => {
    const { videoId } = req.params;

    res.status(200).json({
      data: videoId,
      message: 'video retrieved'
    });
  });

  router.post('/', (req, res, next) => {
    res.status(201).json({
      data: {},
      message: 'video created'
    });
  });

  router.put('/:videoId', (req, res, next) => {
    const { videoId } = req.params;

    res.status(200).json({
      data: videoId,
      message: 'video updated'
    });
  });

  router.delete('/:videoId', (req, res, next) => {
    const { videoId } = req.params;

    res.status(200).json({
      data: videoId,
      message: 'video deleted'
    });
  });
}

module.exports = videosApi;
