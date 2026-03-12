import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.end('Hello world');
})

app.listen(80);

import { MongoClient } from 'mongodb';

async function runGetStarted() {
  //const uri = 'mongodb://localhost:27017';
  const uri = 'mongodb+srv://testUser:FxGKmKXbl7dXZTf1@cluster0.ebvluuf.mongodb.net/?appName=Cluster0';
  const client = new MongoClient(uri);
  try {
    /*const database = client.db('one');
    const presidents = database.collection('presidents');
    const query = { name: 'Donald Trump' };
    const theDonald = await presidents.findOne(query);
    console.log(theDonald);*/

    // console.log(await (client.db('one').collection('presidents')).findOne({ name: 'Donald Trump' }));


    const database = client.db('sample_airbnb');
    const listings = database.collection('listingsAndReviews');
    const theListings = await listings.find({ name: 'Ribeira Charming Duplex' });//.limit(1);//.toArray();

    //await theListings.forEach(l => console.log(l));

    /*for await (const listing of theListings) {
      console.log(listing);
    }*/

      console.log(await listings.countDocuments());
      //console.log(await theListings.count());
    console.log(await listings.countDocuments({ name: 'Ribeira Charming Duplex' }));
    /*while (await theListings.hasNext()) {
      console.log(await theListings.next());
    }*/

  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);
