import assert from "assert";
import ByteBuffer from "bytebuffer";

var EthAddress = {
    fromId(id) {
        let allowedTypes = ["1.2.", "1.16."];
        let type, index;
        for (var t in allowedTypes) {
            if (id.indexOf(allowedTypes[t]) == 0) {
                index = allowedTypes[t].length;
                type = t;
            }
        }
        assert(type >= 0, "unknown id type");
        assert(index, "unknown id type");
        const prefix = new Buffer( [type] );
        const postfix = Buffer.from( parseInt(id.substr(index)).toString(16), 'hex' );
        const totalLength = 32;
        const currentLength = prefix.length + postfix.length;

        const addr = Buffer.concat([prefix, Buffer.alloc(totalLength - currentLength, 0), postfix], totalLength);
        return addr.toString('hex');
    }
}

export default EthAddress;