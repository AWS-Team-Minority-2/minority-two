import express, { Application } from 'express';
import { Client } from '@elastic/elasticsearch';
import { pool as pg } from '@min-two/postgres-node';

const node = express();
const port = 7000;

const es = new Client({ node: 'http://localhost:9200' });

console.log(es);
