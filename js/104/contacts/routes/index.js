import express from 'express';
const router = express.Router();
import pool from '../pool.js';
import debugLib from 'debug';
const debug = debugLib('contacts:index');

router.get('/', async (req, res, next) => {
  try {
    const [results] = await /*global.connection.*/pool.execute(
      'SELECT * FROM contacts'
    );

    res.render('layout', {
      title: 'PCS Contacts',
      contacts: results,
      noContacts: !results?.length,
      partials: {
        content: 'index'
      }
    });

  } catch (err) {
    next(err);
  }
});


router.route('/addContact')
  .get((req, res, next) => {
    res.render('layout', {
      title: 'Add Contact',
      partials: {
        content: 'contactForm'
      }
    });
  })
  .post(async (req, res, next) => {
    try {
      const [results] = await /*global.connection.*/pool.execute(
        'INSERT INTO contacts(first, last, email, phone) VALUES(?,?,?,?)', [req.body.first, req.body.last, req.body.email, req.body.phone]
      );

      // console.log(results);

      res.writeHead(301, {
        location: '/'
      });
      res.end();

    } catch (err) {
      next(err);
    }
  });

router.param('id', async (req, res, next) => {
  /*const contact = contacts.find(c => c.id === Number(req.params.id));
  if (!contact) {
    next(new Error(`Contact ${req.params.id} not found`));
  }
  req.contact = contact;
  next();*/

  try {
    const [results] = await /*global.connection.*/pool.execute(
      'SELECT * FROM contacts WHERE id = ?', [req.params.id]
    );

    if (!results.length) {
      return next(new Error(`Contact ${req.params.id} not found`));
    }

    req.contact = results[0];

    next();
  } catch (err) {
    next(err);
  }
});

router.route('/editContact/:id')
  .get((req, res, next) => {
    //const contact = contacts.find(c => c.id === Number(req.params.id));

    debug(`edit started for id ${req.params.id}`);

    res.render('layout', {
      title: 'Edit Contact',
      partials: {
        content: 'contactForm'
      },
      contact: req.contact
    });
  })
  .post(async (req, res, next) => {
    //const contact = contacts.find(c => c.id === Number(req.params.id));
    //Object.assign(req.contact, req.body);

    try {
      const [results] = await /*global.connection.*/pool.execute(
        'UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?', [req.body.first, req.body.last, req.body.email, req.body.phone, req.params.id]
      );

      //console.log(results);
      if (!results.affectedRows) {
        return next(new Error(`Contact ${req.params.id} not updated`));
      }

      res.writeHead(/*302*/301, {
        location: '/'/*,
        'cache-control': 'no-store'*/
      });
      res.end();
    } catch (err) {
      next(err);
    }
  });

router./*post*/get('/deleteContact/:id', async (req, res, next) => {
  try {
    const [results] = await /*global.connection.*/pool.execute(
      'DELETE FROM contacts WHERE id = ?', [req.params.id]
    );

    if (!results.affectedRows) {
      return next(new Error(`Contact ${req.params.id} not deleted`));
    }

    res.writeHead(/*302*/301, {
      location: '/'/*,
      'cache-control': 'no-store'*/
    });
    res.end();
  } catch (err) {
    next(err);
  }
});

export default router;
