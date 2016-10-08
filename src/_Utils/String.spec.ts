import {expect} from 'chai'
import * as StringUtils from './String'

describe('Utils/String', () => {
    describe('encodeBase64', () => {
        it('correctly encodes string', () => {
            expect(StringUtils.encodeBase64('test')).to.equal('dGVzdA==');
        });

        it('correctly encodes empty string', () => {
            expect(StringUtils.encodeBase64('')).to.equal('');
        });
    });

    describe('decodeBase64', () => {
        it('correctly decodes string', () => {
            expect(StringUtils.decodeBase64('dGVzdA==')).to.equal('test');
        });

        it('correctly decodes empty string', () => {
            expect(StringUtils.decodeBase64('')).to.equal('');
        });
    });
});