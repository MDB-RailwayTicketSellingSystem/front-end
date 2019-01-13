import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Background from '../img/wallhaven-210908.jpg';
import { Link } from 'react-router-dom';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

const styles = theme => ({
    menu: {
        width: 200,
    }
});

let startstations = ['北京','上海','天津','重庆','长沙','长春','成都','福州','广州','贵阳','呼和浩特','哈尔滨','合肥','杭州','海口','济南','昆明','拉萨','兰州','南宁','南京','南昌','沈阳','石家庄','太原','乌鲁木齐','武汉','西宁','西安','银川','郑州','深圳','厦门'];
let endstations = ['北京','上海','天津','重庆','长沙','长春','成都','福州','广州','贵阳','呼和浩特','哈尔滨','合肥','杭州','海口','济南','昆明','拉萨','兰州','南宁','南京','南昌','沈阳','石家庄','太原','乌鲁木齐','武汉','西宁','西安','银川','郑州','深圳','厦门'];
const stationinitial=[
    {value:0,label:'热门城市'},
    {value:1,label:'A'},
    {value:2,label:'B'},
    {value:3,label:'C'},
    {value:4,label:'D'},
    {value:5,label:'E'},
    {value:6,label:'F'},
    {value:7,label:'G'},
    {value:8,label:'H'},
    {value:9,label:'J'},
    {value:10,label:'K'},
    {value:11,label:'L'},
    {value:12,label:'M'},
    {value:13,label:'N'},
    {value:14,label:'O'},
    {value:15,label:'P'},
    {value:16,label:'Q'},
    {value:17,label:'R'},
    {value:18,label:'S'},
    {value:19,label:'T'},
    {value:20,label:'W'},
    {value:21,label:'X'},
    {value:22,label:'Y'},
    {value:23,label:'Z'}
];
const stations = [
    ['北京','上海','天津','重庆','长沙','长春','成都','福州','广州','贵阳','呼和浩特','哈尔滨','合肥','杭州','海口','济南','昆明','拉萨','兰州','南宁','南京','南昌','沈阳','石家庄','太原','乌鲁木齐','武汉','西宁','西安','银川','郑州','深圳','厦门'],
    ['阿城','阿达日格','阿尔公','阿尔山', '阿尔乡', '阿贵图', '阿湖镇', '阿金', '阿克苏', '阿拉沟', '阿拉山口', '阿里河', '阿龙山', '阿图什', '阿乌尼', '阿寨', '嗄什甸子', '埃岱', '矮岭', '矮滩', '艾河', '艾家村', '艾田', '艾友营', '爱河', '爱林', '安北', '安达', '安定', '安福', '安富镇', '安广', '安国镇', '安化', '安家', '安家河', '安家湾', '安家庄', '安居', '安康', '安康东', '安口', '安口窑', '安礼', '安陵', '安龙', '安陆', '安平', '安庆', '安庆沟', '安庆西', '安仁', '安顺', '安塘', '安亭', '安图', '安西', '安溪', '安阳', '安阳西', '安邑', '安运镇', '安子沟', '鞍山', '岸山', '昂昂溪', '昂乃', '敖包沟', '敖汉', '敖来', '敖力布告', '敖头'],
    ['八宝','八村','八达沟','八达岭', '八道壕', '八都', '八斗', '八渡', '八方', '八虎力', '八家', '八家旺', '八家子', '八角台', '八棵树', '八里店', '八里庄', '八面城', '八面通', '八庙', '八盘磨', '八盘峡', '八苏木', '八塘', '八圩', '八仙筒', '八一', '八义集', '巴楚', '巴哥', '巴关河', '巴关岭', '巴胡塔', '巴林', '巴伦台', '巴山', '巴图塔', '巴西', '巴彦高勒', '巴彦郭勒', '扒挪块', '拔贡', '坝梁', '坝心', '霸州', '灞桥', '白壁关', '白城','白村', '白地市', '白洞', '白墩子', '白果', '白合', '白河', '白河县', '白鹤铺', '白桦排', '白涧', '白奎堡', '白狼', '白浪', '白龙塘', '白马关', '白帽子', '白庙子', '白旗', '白泉', '白鹊桥', '白沙', '白山', '白山乡', '白山镇', '白石渡', '白石山', '白石岩', '白市', '白水', '白水河', '白水江', '白塔', '白塔埠', '白田坝', '白彦花', '白羊墅', '白音察干', '白音胡硕', '白音他拉', '白音特拉', '白银哈尔', '白银市', '白银西', '白源', '白云鄂博', '百底', '百浪', '百里村', '百亩井', '百朋', '百色', '百善', '柏村', '柏井', '柏林', '班猫箐', '斑竹园', '坂田', '坂尾', '板城', '板其', '板桥', '板杉铺', '板桃', '半截河', '半坡村', '蚌埠', '蚌埠东', '包尔海', '包官营', '包头', '包头北', '包头东', '包头西', '包西乘降所', '包庄', '褒河', '雹神', '宝坻', '宝东', '宝丰', '宝鸡', '宝拉格', '宝老山', '宝林', '宝龙山', '宝木吐', '宝清', '宝泉岭', '宝山', '宝秀', '保定', '保健', '保康', '葆园', '堡石图', '堡子湾', '报恩寺', '鲍峡', '北安', '北白', '北板桥', '北碚', '北仓', '北场', '北大岭', '北戴河', '北甘旗', '北海', '北合流', '北河店', '北京', '北京北','北京东', '北京南', '北京西', '北坑', '北林', '北马圈子', '北牟', '北票南', '北三家', '北山', '北舍', '北松浦', '北台', '北台子', '北塘', '北田受', '北头河', '北屯', '北崖', '北阳', '北义井', '北营', '北园', '北宅', '北召店', '北周庄', '贝江', '背开柱', '背荫河', '奔牛', '贲红', '本溪', '本溪湖', '笔架山', '毕克齐', '碧鸡关', '碧色寨', '碧水', '碧州', '边昭', '卞庄', '别尔米2', '别山', '彬江', '滨江', '兵马营', '丙谷', '丙午', '波罗赤', '波罗坑', '波寨', '玻璃山', '播明', '伯力', '泊头', '勃利', '博克图', '博乐', '博山', '博兴', '渤海', '布敦化', '布尔加依', '布海', '布吉', '布苏里', '部落'],
    ['擦耳', '才湾', '采石', '菜花坪', '蔡家', '蔡家沟', '蔡家坡', '蔡家庄', '蔡山', '仓山镇', '苍山', '苍石', '苍土', '沧口', '沧州', '曹东庄', '曹家', '曹家坝', '曹家营子', '曹王', '曹县', '曹庄', '曹子里', '漕河', '草坝', '草店', '草尔格尔', '草河口', '草桥', '草市', '册享', '侧岭', '测石', '策达雅', '插花', '茶淀', '茶陵', '茶岭', '茶山', '茶条沟', '茶坞', '茶园', '茶镇', '查班河', '查干哈达', '查干特格', '查干艺和', '察尔汗', '察汗诺', '察素齐', '岔江', '岔滩', '岔西滩', '柴岗', '柴沟堡', '柴河', '柴凯', '柴窝堡', '柴西', '柴庄', '昌傅', '昌乐', '昌黎', '昌平', '昌平北', '昌图', '昌寨', '常村', '常德', '常兴', '常州', '常州东', '常庄', '厂汗', '绰尔', '超梁沟', '巢湖', '朝查', '朝格温多尔', '朝家', '朝脑沟', '朝天', '朝阳', '朝阳川', '朝阳村', '朝阳地', '朝阳南', '朝阳镇', '朝原', '朝晕', '朝中', '潮安', '潮莫', '潮州', '车家营子', '郴州', '辰清', '辰溪', '陈官屯', '陈官营', '陈家河', '陈家湖', '陈家屯', '陈家湾', '陈相屯', '晨明', '成都', '成都东', '成都南', '成高子', '成吉思汗', '成团', '呈贡', '承安铺', '承德', '承德东', '城固', '城厢', '城阳', '城子坦', '程村', '程家', '程祥', '池河', '赤峰', '赤峰东', '赤峰西', '赤水', '赤塔2', '崇仁', '崇信', '崇左', '筹洞', '滁州', '楚鲁图', '楚山', '楚雄', '褚家湾', '川弓', '川岭', '川山坪', '川水', '穿心店', '创业村', '吹塘', '春林', '春亭阁', '春湾', '春阳', '纯化', '茨坝', '茨冲', '慈城', '慈利', '磁涧', '磁山', '磁西', '磁县', '磁窑', '崔黄口', '翠峰', '翠岗', '撮镇', '嵯岗'],
    ['达板城', '达布逊', '达尔汗', '达盖', '达家沟', '达拉滨', '达拉特旗', '达赖沟', '达里', '达日其嘎', '达县', '打柴沟', '打拉亥', '打兔寨', '打羊', '大安', '大安北', '大坳', '大巴', '大坝', '大板', '大勃吉', '大步', '大昌', '大厂县', '大陈庄', '大成', '大城子', '大程', '大川', '大村甸', '大甸', '大东', '大渡口', '大端河', '大岗', '大港', '大格达', '大姑家', '大关冲', '大观岭', '大官屯', '大哈伯', '大罕', '大河坝', '大河岔', '大河桥', '大黑山', '大红旗', '大湖', '大虎山', '大灰厂', '大箕铺', '大涧', '大江', '大江口', '大坑口', '大口钦', '大口屯', '大昆仑', '大朗', '大老铺', '大梨树', '大里堡', '大理', '大荔', '大连', '大良', '大林', '大陵', '大岭', '大岭铺', '大刘庄', '大柳塔', '大柳塔北', '大龙村', '大陆盖', '大陆号', '大路', '大路底', '大满庄', '大米溪', '大庙', '大民屯', '大拟', '大牛店', '大盘石', '大平', '大平房', '大坪', '大坡', '大埔', '大浦街', '大其拉哈', '大桥', '大青', '大青川', '大庆', '大庆岭', '大泉', '大溶江', '大沙', '大沙田', '大山铺', '大石', '大石板', '大石桥', '大石头', '大石寨', '大树湾', '大水沟', '大松树', '大塔', '大滩', '大塘埠', '大田边', '大田山', '大通', '大同', '大同北', '大同东', '大同南', '大同县', '大土', '大土山', '大屯', '大湾', '大乌苏', '大西', '大西沟', '大溪河', '大仙', '大辛庄', '大新', '大兴', '大兴沟', '大兴镇', '大许家', '大雁', '大扬气', '大阳岔', '大杨树', '大杨树东', '大洋洲', '大冶', '大营', '大营镇', '大营子', '大用', '大榆树', '大寨', '大战场', '大杖子', '大召营', '大竹园', '大庄', '大足', '代家坝', '代马沟', '代湾', '代县', '岱河', '岱岳', '带岭', '待王', '埭南', '戴集', '丹东', '丹江', '丹阳', '弹音', '当涂', '当阳', '砀山', '倒湖', '到保', '道德', '道老杜', '道林', '道仑郭勒', '道木达', '道清', '道镇', '得耳布尔', '得利寺', '得胜村', '得胜台', '德安', '德伯斯', '德昌', '德代沟', '德惠', '德令哈', '德农', '德日斯图', '德胜', '德文托盖', '德阳', '德州', '灯笼山', '灯塔', '灯芯桥', '登沙河', '登瀛崖', '邓家村', '邓州', '低窝铺', '低庄', '滴道', '滴水', '滴台', '地阳平', '店坡', '店上', '刁河店', '刁家段', '丁家坝', '丁家营', '丁家园', '丁里', '丁营', '鼎湖', '定南', '定陶', '定西', '定襄', '定兴', '定州', '东安', '东坝', '东堡城', '东边井', '东车辆段', '东晨', '东城', '东城集', '东大坝', '东大道', '东都', '东方红', '东丰', '东风', '东阜新', '东富', '东岗', '东葛', '东宫', '东关', '东观', '东莞', '东莞东', '东光', '东海', '东海县', '东壕', '东河', '东河南', '东花园', '东佳木斯', '东江', '东津', '东京城', '东口', '东来', '东梁', '东陵', '东龙', '东马', '东门', '东明村', '东明县', '东南营子', '东坪', '东屏', '东坡', '东沙王庄', '东山', '东升坝', '东胜', '东汤', '东田良', '东通化', '东乡', '东辛庄', '东兴', '东戌', '东阳', '东阳渡', '东阳关', '东营', '东淤地', '东榆林', '东元庆', '东园', '东赵', '东镇', '东砖厂', '东庄', '冬瓜铺', '董村', '董岗', '董家坪', '董家庄', '董庄', '栋青树', '洞庙河', '洞子崖', '都街', '都拉营', '都伦', '都司', '都匀', '斗沟子', '斗虎屯', '斗罗', '豆海', '豆家峡', '豆张庄', '豆庄', '窦店', '窦家沟', '窦妪', '独李村', '独立屯', '独流', '独山', '读书铺', '杜草', '杜尔基', '杜家', '杜家台', '杜科', '杜屯', '杜赵', '渡口', '渡市', '端氏', '段甲岭', '段柳', '段廷', '段园', '对面泉', '对青山', '对亭', '兑镇', '敦化', '敦煌'],
    ['峨边', '峨眉', '峨桥', '鄂木斯克', '鄂州', '儿滚', '尔赛河', '二八台', '二堡', '二道岗', '二道沟', '二道沟门', '二道河', '二道桥', '二道沙河', '二道湾', '二道岩', '二道营子', '二宫', '二号洞', '二井', '二郎', '二郎集', '二郎庙', '二连', '二龙', '二龙山', '二龙山屯', '二密河', '二十里店', '二十里铺', '二十里台', '二塘', '二塘区', '二营', '二营子'],
    ['发车场', '繁昌北', '繁峙', '范各庄', '范家屯', '范家园', '范镇', '范庄', '方家', '芳山镇', '防城', '防城港', '纺织城', '飞凤坡', '飞来峡', '肥城', '肥西', '费县', '分守岭', '分水', '分水岭', '分宜', '奋发', '丰城', '丰城南', '丰广', '丰库', '丰乐镇', '丰岭', '丰南', '丰荣', '丰润', '丰水村', '丰顺', '丰台', '丰镇', '风陵渡', '风石堰', '枫泾', '枫岭头', '封浜', '封丘', '峰洞', '峰峰', '峰高铺', '冯家', '冯家口', '冯家山', '冯屯', '凤凰', '凤凰城', '凤凰村', '凤凰山', '凤鸣', '凤鸣村', '凤台', '凤县', '凤翔', '凤阳', '凤州', '佛岭', '佛山', '佛峪', '佛子岭', '伏牛溪', '扶绥', '扶余', '服装城', '浮梁', '浮石', '浮图峪', '浮屠街', '符离集', '福安', '福飞', '福港', '福金', '福利屯', '福隆', '福泉', '福山口', '福山寺', '福生庄', '福塘', '福溪', '福兴屯', '福州', '抚宁', '抚宁北', '抚顺', '抚顺城', '抚州北', '府助', '付家河', '付楼', '附城', '阜南', '阜新', '阜阳', '阜阳北', '傅家屯', '富海', '富洪村', '富家滩', '富锦', '富拉尔基', '富拉尔基西', '富乐', '富林', '富岭', '富平', '富强堡', '富荣', '富县', '富用', '富裕', '富庄子'],
    ['广州南','广州东','贵阳','广州','广州西','格尔木','广汉','古交','桂林北','古莲','桂林','固始'],
    ['哈尔滨','哈尔滨东','哈尔滨西','合肥','合肥西','呼和浩特','海口东','海口','杭州东','杭州','汉口','横店','衡阳','衡水'],
    ['济南','济南西','吉安','集安','江边村','晋城','金城江','景德镇','嘉峰','加格达奇','井冈山','蛟河'],
    ['昆明','昆明西','库尔勒','开封','岢岚','凯里','喀什','昆山南','奎屯','开原','开安','库车'],
    ['拉萨','兰州东','兰州','兰州西','六安','灵宝','芦潮港','隆昌','陆川','利川','临川','潞城'],
    ['麻城','免渡河','牡丹江','莫尔道嘎','明光','满归','漠河','茂名','茂名西','密山','马三家','麻尾'],
    ['南昌','南京','南京南','南宁','宁波东','宁波','南岔','南充','南丹','南大庙','南芬','讷河'],
    ['欧家坡','欧里'],
    ['帕满', '排楼', '排前', '排塘', '徘徊北', '牌坊路', '牌头', '潘集', '潘集西', '潘家店', '攀枝花', '盘古', '盘古寺', '盘脚营', '盘锦', '盘溪', '磐石', '泡子', '炮车', '裴城', '裴德', '配件厂', '彭城', '彭家湾', '彭山', '彭阳', '蓬安', '蓬莱', '蓬莱镇', '蓬溪', '篷塘', '邳县', '劈柴沟', '皮口', '啤木镇', '偏店', '瓢儿屯', '品甸', '平安', '平安堡', '平安驿', '平安镇', '平坝', '平等', '平顶堡', '平顶庙', '平顶山', '平顶山东', '平东', '平房', '平岗', '平果', '平湖', '平吉堡', '平凉', '平凉南', '平寮', '平林村', '平罗', '平南', '平琴', '平泉', '平山', '平山塘', '平社', '平爽', '平台', '平塘', '平旺', '平型关', '平洋', '平遥', '平义分', '平邑', '平峪', '平原', '平庄', '平庄南', '坪口', '坪上', '坪石', '坪头', '凭祥', '凭祥北', '萍乡', '坡底村', '坡底下', '坡里', '坡头', '坡圩', '坡新塘', '葡萄', '葡萄菁', '蒲坝', '蒲城', '蒲家', '蒲圻', '蒲山店', '蒲州', '浦江', '普济', '普兰店', '普连集', '普通', '普雄'],
    ['蕲春','青城山','青岛','清河城','曲靖','黔江','前进镇','齐齐哈尔','七台河','沁县','泉州东','泉州'],
    ['冉家河', '穰东', '让湖路', '饶阳', '绕阳河', '热水', '热水塘', '人和', '仁东', '仁里冲', '仁祥屯', '稔竹', '任丘', '日照', '日照西', '荣昌', '荣家湾', '溶口', '融安', '融水', '汝阳', '汝州', '乳山', '瑞昌'],
    ['上海','上海南','上海虹桥','上海西','石家庄北','石家庄','沈阳','沈阳北','沈阳东','沈阳南','双城堡','绥芬河'],
    ['天津北','天津','天津南','天津西','太原北','太原东','太原','塘豹','塔尔气','潼关','塘沽','塔河'],
    ['武汉','王家营西','乌鲁木齐','五常','武昌','瓦房店','威海','芜湖','乌海西','吴家屯','武隆','潍坊'],
    ['香港西九','西安北','西安','西安南','西宁','西昌','许昌','西昌南','锡林浩特','厦门北','厦门','厦门高崎'],
    ['银川','延安','宜宾','亚布力南','叶柏寿','宜昌东','永川','盐城','宜昌','运城','伊春','榆次'],
    ['郑州','淄博','镇城底','自贡','珠海','珠海北','湛江','镇江','张家界','张家口','张家口南','周口']
];

class Booking extends React.Component {
    state={
        start:'',
        end: '',
        date:'',
        startDate:new Date(),
        startini:0,
        endini:0
    };

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeStart = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        if (event.target.value===0) startstations=stations[0];
        if (event.target.value===1) startstations=stations[1];
        if (event.target.value===2) startstations=stations[2];
        if (event.target.value===3) startstations=stations[3];
        if (event.target.value===4) startstations=stations[4];
        if (event.target.value===5) startstations=stations[5];
        if (event.target.value===6) startstations=stations[6];
        if (event.target.value===7) startstations=stations[7];
        if (event.target.value===8) startstations=stations[8];
        if (event.target.value===9) startstations=stations[9];
        if (event.target.value===10) startstations=stations[10];
        if (event.target.value===11) startstations=stations[11];
        if (event.target.value===12) startstations=stations[12];
        if (event.target.value===13) startstations=stations[13];
        if (event.target.value===14) startstations=stations[14];
        if (event.target.value===15) startstations=stations[15];
        if (event.target.value===16) startstations=stations[16];
        if (event.target.value===17) startstations=stations[17];
        if (event.target.value===18) startstations=stations[18];
        if (event.target.value===19) startstations=stations[19];
        if (event.target.value===20) startstations=stations[20];
        if (event.target.value===21) startstations=stations[21];
        if (event.target.value===22) startstations=stations[22];
        if (event.target.value===23) startstations=stations[23];
    };

    handleChangeEnd = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        if (event.target.value===0) endstations=stations[0];
        if (event.target.value===1) endstations=stations[1];
        if (event.target.value===2) endstations=stations[2];
        if (event.target.value===3) endstations=stations[3];
        if (event.target.value===4) endstations=stations[4];
        if (event.target.value===5) endstations=stations[5];
        if (event.target.value===6) endstations=stations[6];
        if (event.target.value===7) endstations=stations[7];
        if (event.target.value===8) endstations=stations[8];
        if (event.target.value===9) endstations=stations[9];
        if (event.target.value===10) endstations=stations[10];
        if (event.target.value===11) endstations=stations[11];
        if (event.target.value===12) endstations=stations[12];
        if (event.target.value===13) endstations=stations[13];
        if (event.target.value===14) endstations=stations[14];
        if (event.target.value===15) endstations=stations[15];
        if (event.target.value===16) endstations=stations[16];
        if (event.target.value===17) endstations=stations[17];
        if (event.target.value===18) endstations=stations[18];
        if (event.target.value===19) endstations=stations[19];
        if (event.target.value===20) endstations=stations[20];
        if (event.target.value===21) endstations=stations[21];
        if (event.target.value===22) endstations=stations[22];
        if (event.target.value===23) endstations=stations[23];
    };

    handleChangeDate(date) {
        this.setState({
            startDate: date
        });
    }

    render(){

        const {classes} = this.props;
        const accountID = this.props.match.params.accountID;



        return (
            <div style={{background: `url(${Background}) no-repeat` ,width:"100%",height:700,position:"absolute"}}>
                <div >
                    <Paper style={{margin:10}}>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"

                    >
                        <Typography style={{marginRight:300,marginTop:10,marginLeft:50}} variant="h5" component="p">
                            欢迎您，{accountID}
                        </Typography>
                        <div>
                            <Link to={'/Booking/'+accountID}>
                                <SendIcon /><Tab label="查询车票" />
                            </Link>
                            <Link to={'/Orders/'+accountID}>
                                <DraftsIcon /><Tab label="历史订单" />
                            </Link>
                        </div>
                    </Tabs>
                </Paper>
                </div>
                <div>
                        <Paper style={{width:400,left:100,position:"absolute",top:120}}>
                        <Grid container
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              >
                            <Grid item xs={12}>
                                <Grid item>
                                    <div>
                                        <TextField
                                            style={{margin:10}}
                                            id="startini"
                                            select
                                            label="出发地首字母"
                                            value={this.state.startini}
                                            onChange={this.handleChangeStart('startini')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            margin="normal"
                                        >
                                            {stationinitial.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    <TextField
                                        style={{margin:10,width:200}}
                                        id="start"
                                        select
                                        label="出发地"
                                        value={this.state.start}
                                        onChange={this.handleChange('start')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="请选择出发站"
                                        margin="normal">
                                        {startstations.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Grid>
                                <Grid item>
                                    <div>
                                        <TextField
                                            style={{margin:10}}
                                            id="endini"
                                            select
                                            label="到达地首字母"
                                            value={this.state.endini}
                                            onChange={this.handleChangeEnd('endini')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            margin="normal"
                                        >
                                            {stationinitial.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                        <TextField
                                            style={{margin:10,width:200}}
                                            id="end"
                                            select
                                            label="到达地"
                                            value={this.state.end}
                                            onChange={this.handleChange('end')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            helperText="请选择到达站"
                                            margin="normal"
                                        >
                                            {endstations.map(option => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </div>
                                </Grid>

                                <Grid item>
                                <div style={{margin:10}}>
                                    <Typography component="p">
                                        请选择出发日期：
                                    </Typography>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>
                            </Grid>
                                <Grid item>
                                    <div>
                                    <Link to={'/Results/'+accountID+'/'+this.state.start+'/'+this.state.end+'/'+moment(this.state.startDate).format('YYYY-MM-DD')}>
                                        <Button
                                            type="search"
                                            style={{marginTop:10,marginBottom:10}}
                                            fullWidth
                                            variant="contained"
                                            color="primary">
                                            查询
                                        </Button>
                                    </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                     </Paper>
                </div>
            </div>
        );
    }
}

Booking.propTypes = {
    classes: PropTypes.object.isRequired,
};
Booking.contextTypes = {router:()=> React.PropTypes.func.isRequired };
export default withStyles(styles)(Booking);