import {expect} from 'chai'
import * as UrlUtils from './Url'

describe('Utils/Url', () => {
    describe('getUrlInstance', () => {
        // @TODO test instanceof Url
        // it('correctly gets Url instance from valid href', () => {
        //     const url = UrlUtils.getUrlInstance('http://www.google.com');
        //     console.log(url);
        //     expect(R.equals(url.protocol, 'http:')).to.equal(true);
        //     expect(R.equals(url.hostname, 'www.google.com')).to.equal(true);
        //     expect(R.equals(url.href, 'http://www.google.com')).to.equal(true);
        //     // console.log(url instanceof Url);
        // });

        // @TODO test instanceof Url
        // it('correctly gets Url instance from invalid href', () => {
        //     const url = UrlUtils.getUrlInstance('');
        //     expect(R.equals(url.protocol, null)).to.equal(true);
        //     expect(R.equals(url.hostname, null)).to.equal(true);
        //     expect(R.equals(url.href, '')).to.equal(true);
        //     // console.log(url instanceof Url);
        // });
    });

    describe('getOriginFromUrl', () => {
        it('returns google.com from Url instance\'s hostname => http://www.google.com/', () => {
            const
                url = UrlUtils.getUrlInstance('http://www.google.com/'),
                origin = UrlUtils.getOriginFromUrlInstance(url);

            expect(origin).to.equal('google.com');
        });

        it('returns google.com from Url instance\'s hostname => https://google.com', () => {
            const
                url = UrlUtils.getUrlInstance('https://google.com'),
                origin = UrlUtils.getOriginFromUrlInstance(url);

            expect(origin).to.equal('google.com');
        });

        it('throws when invalid href provided in Url instance', () => {
            const url = UrlUtils.getUrlInstance('');

            expect(() => UrlUtils.getOriginFromUrlInstance(url)).to.throw();
        });
    });
});