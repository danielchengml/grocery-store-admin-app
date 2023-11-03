import db from '../dao/db'

export const show = (_, res) => {

  return Promise.all([db.ping()])
    .then((data) => {
      res.status(200);
      return res.json({
        db: data[0],
      });
    })
    .catch((err) => {
      console.log('DB FAILS HEALTHCHECK:', err);
      res.status(500);
      return res.json({ error: 'NOT HEALTHY' });
    });
}
