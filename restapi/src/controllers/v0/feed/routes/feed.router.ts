import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

//Get all feed items
router.get('/', async(req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
        if(item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

//@TODO, Add an endpoint to GET a specific resource by primary key
router.get('/id', async(req: Request, res: Response) => {
    const item: FeedItem = await FeedItem.findByPk();
});
//update a specific resource
router.patch('/:id', requireAuth,async (req:Request, res: Response) => {
   //@TODO try it yourself
   res.status(500).send("Not implemented yet"); 
});

//Get a signed url to put a new item in the bucket
router.get('/signed-url/:filename', requireAuth, async (req: Request, res: Response) => {
    let { filename } = req.params;
    const url = AWS.getPutSignedUrl(filename);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth, async(req: Request, res: Response) => {
    const caption = req.body.caption;
    const filename = req.body.url;

    //check caption validity
    if(!caption){
        return res.status(400).send({message: 'Caption is required or is invalid'});
    }

    //check filename validity
    if(!filename){
        return res.status(400).send({message: 'File url is required'});
    }

    const item = await new FeedItem({
        caption: caption,
        url: filename
    });

    const saved_item = await item.save();
    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;
