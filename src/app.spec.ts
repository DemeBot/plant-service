import * as mocha from "mocha";
import * as chai from "chai";

import chaiHttp = require( "chai-http" );

import app from "./app";

chai.use( chaiHttp );
const expect = chai.expect;
