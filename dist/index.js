"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.encodeNumber = exports.toCoinId = exports.concatBytes = exports.validHash = exports.validHex = exports.stripHex = exports.formatHex = exports.toBytes = exports.toHex = exports.hashInfo = exports.addressInfo = exports.decodeString = exports.encodeString = exports.sha256 = exports.stringify = exports.toSignature = exports.toPublicKey = exports.toPrivateKey = exports.aggregateVerify = exports.aggregate = exports.verify = exports.sign = exports.generatePublicKey = exports.generatePrivateKey = exports.toSeed = exports.randomMnemonic = void 0;
var bls_signatures_1 = __importDefault(require("@chiamine/bls-signatures"));
var bech32_1 = require("bech32");
var bip39_1 = require("bip39");
var crypto_1 = require("crypto");
var blsPromise = bls_signatures_1["default"]();
function randomMnemonic() {
    return bip39_1.generateMnemonic();
}
exports.randomMnemonic = randomMnemonic;
function toSeed(mnemonic) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = Uint8Array).from;
                    return [4 /*yield*/, bip39_1.mnemonicToSeed(mnemonic)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.toSeed = toSeed;
function generatePrivateKey(seed) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.AugSchemeMPL.key_gen(seed)];
            }
        });
    });
}
exports.generatePrivateKey = generatePrivateKey;
function generatePublicKey(privateKey) {
    return privateKey.get_g1();
}
exports.generatePublicKey = generatePublicKey;
function sign(privateKey, message) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.AugSchemeMPL.sign(privateKey, message)];
            }
        });
    });
}
exports.sign = sign;
function verify(publicKey, message, signature) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.AugSchemeMPL.verify(publicKey, message, signature)];
            }
        });
    });
}
exports.verify = verify;
function aggregate(signatures) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.AugSchemeMPL.aggregate(signatures)];
            }
        });
    });
}
exports.aggregate = aggregate;
function aggregateVerify(publicKeys, messages, signature) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.AugSchemeMPL.aggregate_verify(publicKeys, messages, signature)];
            }
        });
    });
}
exports.aggregateVerify = aggregateVerify;
function toPrivateKey(bytes) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.PrivateKey.from_bytes(bytes, false)];
            }
        });
    });
}
exports.toPrivateKey = toPrivateKey;
function toPublicKey(bytes) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.G1Element.from_bytes(bytes)];
            }
        });
    });
}
exports.toPublicKey = toPublicKey;
function toSignature(bytes) {
    return __awaiter(this, void 0, void 0, function () {
        var bls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blsPromise];
                case 1:
                    bls = _a.sent();
                    return [2 /*return*/, bls.G2Element.from_bytes(bytes)];
            }
        });
    });
}
exports.toSignature = toSignature;
function stringify(data) {
    return toHex(data.serialize());
}
exports.stringify = stringify;
function sha256(text) {
    return Uint8Array.from(crypto_1.createHash('sha256').update(text).digest());
}
exports.sha256 = sha256;
function encodeString(text) {
    var array = new Uint8Array(text.length);
    for (var i = 0; i < text.length; i++)
        array[i] = text.charCodeAt(i);
    return array;
}
exports.encodeString = encodeString;
function decodeString(array) {
    var text = '';
    for (var i = 0; i < array.length; i++)
        text += String.fromCharCode(array[i]);
    return text;
}
exports.decodeString = decodeString;
function addressInfo(address) {
    var result = bech32_1.bech32m.decode(address);
    return {
        hash: toHex(convertBits(Uint8Array.from(result.words), 5, 8, false)),
        address: address,
        prefix: result.prefix
    };
}
exports.addressInfo = addressInfo;
function hashInfo(puzzleHash, prefix) {
    var result = bech32_1.bech32m.encode(prefix, convertBits(toBytes(puzzleHash), 8, 5, true));
    return {
        hash: puzzleHash,
        address: result,
        prefix: prefix
    };
}
exports.hashInfo = hashInfo;
function convertBits(bytes, from, to, pad) {
    var e_1, _a;
    var accumulate = 0;
    var bits = 0;
    var maxv = (1 << to) - 1;
    var result = [];
    try {
        for (var bytes_1 = __values(bytes), bytes_1_1 = bytes_1.next(); !bytes_1_1.done; bytes_1_1 = bytes_1.next()) {
            var value = bytes_1_1.value;
            var b = value & 0xff;
            if (b < 0 || b >> from > 0)
                throw new Error('Could not convert bits.');
            accumulate = (accumulate << from) | b;
            bits += from;
            while (bits >= to) {
                bits -= to;
                result.push((accumulate >> bits) & maxv);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bytes_1_1 && !bytes_1_1.done && (_a = bytes_1["return"])) _a.call(bytes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (pad && bits > 0) {
        result.push((accumulate << (to - bits)) & maxv);
    }
    else if (bits >= from || ((accumulate << (to - bits)) & maxv) != 0) {
        throw new Error('Could not convert bits.');
    }
    return Uint8Array.from(result);
}
function toHex(bytes) {
    return Buffer.from(bytes).toString('hex');
}
exports.toHex = toHex;
function toBytes(hex) {
    return Uint8Array.from(Buffer.from(hex, 'hex'));
}
exports.toBytes = toBytes;
function formatHex(hex) {
    return '0x' + hex;
}
exports.formatHex = formatHex;
function stripHex(hex) {
    return hex.startsWith('0x') ? hex.slice(2) : hex;
}
exports.stripHex = stripHex;
function validHex(hex) {
    return /[0-9a-f]+/.test(hex);
}
exports.validHex = validHex;
function validHash(hash) {
    return /[0-9a-f]{64}/.test(hash);
}
exports.validHash = validHash;
function concatBytes() {
    var e_2, _a;
    var byteLists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        byteLists[_i] = arguments[_i];
    }
    var result = new Uint8Array(byteLists.reduce(function (aggregate, bytes) { return aggregate + bytes.length; }, 0));
    var index = 0;
    try {
        for (var byteLists_1 = __values(byteLists), byteLists_1_1 = byteLists_1.next(); !byteLists_1_1.done; byteLists_1_1 = byteLists_1.next()) {
            var bytes = byteLists_1_1.value;
            result.set(bytes, index);
            index += bytes.length;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (byteLists_1_1 && !byteLists_1_1.done && (_a = byteLists_1["return"])) _a.call(byteLists_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}
exports.concatBytes = concatBytes;
function toCoinId(parent, puzzle, amount) {
    return sha256(concatBytes(parent, puzzle, amount));
}
exports.toCoinId = toCoinId;
function encodeNumber(value) {
    var hex = value.toString(16);
    if (hex.length % 2 !== 0)
        hex = "0" + hex;
    return toBytes(hex);
}
exports.encodeNumber = encodeNumber;
//# sourceMappingURL=index.js.map