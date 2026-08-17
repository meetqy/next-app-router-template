import type { CampusOperationType } from "./campuses";

export type OfficialCampusRow = {
	address: string;
	city: string;
	district?: string;
	infoStatus: "pending";
	name: string;
	operationType: CampusOperationType;
	slug: string;
};

export const OFFICIAL_CAMPUSES: OfficialCampusRow[] = [
	{
		"address": "成都市锦江区柳江街道玉树路1号58神奇空间1号楼905",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "林家坝校区",
		"operationType": "direct",
		"slug": "林家坝校区"
	},
	{
		"address": "成都市锦江区月季街67号三楼303号",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "绿地468校区",
		"operationType": "direct",
		"slug": "绿地468校区"
	},
	{
		"address": "成都市锦江区玉兰街209号1栋3楼301-312号",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "蓝谷地校区",
		"operationType": "direct",
		"slug": "蓝谷地校区"
	},
	{
		"address": "成都市锦江区通宝街292号1楼",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "攀成钢校区",
		"operationType": "direct",
		"slug": "攀成钢校区"
	},
	{
		"address": "成都市锦江区琉璃路311号1层",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "东湖校区",
		"operationType": "direct",
		"slug": "东湖校区"
	},
	{
		"address": "成都市锦江区一环路东五段46号1栋2层10号、22号、23号",
		"city": "成都",
		"district": "锦江区",
		"infoStatus": "pending",
		"name": "九眼桥校区",
		"operationType": "direct",
		"slug": "九眼桥校区"
	},
	{
		"address": "成都市金牛区金泉街道蜀跃路2号10栋2层2号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "蜀跃路校区",
		"operationType": "direct",
		"slug": "蜀跃路校区"
	},
	{
		"address": "成都市金牛区一环路北二段9号4栋2层附210号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "花千集校区",
		"operationType": "direct",
		"slug": "花千集校区"
	},
	{
		"address": "成都市金牛区阳光街18号5层504号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "蜀西路校区",
		"operationType": "direct",
		"slug": "蜀西路校区"
	},
	{
		"address": "成都市金牛区五福桥东路9号附35号1层",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "城北校区",
		"operationType": "direct",
		"slug": "城北校区"
	},
	{
		"address": "成都市金牛区解放路一段168号1栋3层301号、4层401号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "基地校区",
		"operationType": "direct",
		"slug": "基地校区"
	},
	{
		"address": "成都市金牛区金谷三路46号3栋2楼附201号、附204号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "国宾校区",
		"operationType": "direct",
		"slug": "国宾校区"
	},
	{
		"address": "成都市金牛区交大路256号2幢2层附2号",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "交大校区",
		"operationType": "direct",
		"slug": "交大校区"
	},
	{
		"address": "成都市金牛区一品天下大街172号附2号3层",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "一品天下校区",
		"operationType": "direct",
		"slug": "一品天下校区"
	},
	{
		"address": "成都市金牛区二环路北一段8号B座2楼",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "营门口校区",
		"operationType": "direct",
		"slug": "营门口校区"
	},
	{
		"address": "成都市金牛区西安南路93-117号1-1幢2层",
		"city": "成都",
		"district": "金牛区",
		"infoStatus": "pending",
		"name": "西安南路校区",
		"operationType": "direct",
		"slug": "西安南路校区"
	},
	{
		"address": "成都市青羊区小南街123号5栋2层2号附1号",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "大石路校区",
		"operationType": "direct",
		"slug": "大石路校区"
	},
	{
		"address": "成都市青羊区金沙遗址路88号4栋2楼附210号",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "金沙滨河",
		"operationType": "direct",
		"slug": "金沙滨河"
	},
	{
		"address": "成都市青羊区金阳路2号附201号2层",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "金沙博物馆校区",
		"operationType": "direct",
		"slug": "金沙博物馆校区"
	},
	{
		"address": "成都市青羊区清江东路198号保得商务楼3楼（4号线草堂北路地铁站C口）",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "草堂校区",
		"operationType": "direct",
		"slug": "草堂校区"
	},
	{
		"address": "成都市青羊区顺城大街252号",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "顺吉单招校区",
		"operationType": "direct",
		"slug": "顺吉单招校区"
	},
	{
		"address": "成都市青羊区鼓楼南街117号世贸中心2楼（招商银行楼上）",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "留学世贸总部",
		"operationType": "direct",
		"slug": "留学世贸总部"
	},
	{
		"address": "成都市青羊区顺城大街252号顺吉大厦3楼",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "鼓楼校区",
		"operationType": "direct",
		"slug": "鼓楼校区"
	},
	{
		"address": "成都市青羊区鼓楼南街117号2-1幢2层1号",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "世贸校区",
		"operationType": "direct",
		"slug": "世贸校区"
	},
	{
		"address": "成都市青羊区顺城大街252号6层",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "顺吉校区",
		"operationType": "direct",
		"slug": "顺吉校区"
	},
	{
		"address": "成都市青羊区培风横街243号2层附2号",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "光华校区",
		"operationType": "direct",
		"slug": "成都青羊区光华校区"
	},
	{
		"address": "成都市青羊区光华西二路48号附301号3楼",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "中坝新城校区",
		"operationType": "direct",
		"slug": "中坝新城校区"
	},
	{
		"address": "成都市青羊区成飞大道487号1栋3楼308",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "成飞校区",
		"operationType": "direct",
		"slug": "成飞校区"
	},
	{
		"address": "成都市青羊区贝森北路5号1栋15层1501",
		"city": "成都",
		"district": "青羊区",
		"infoStatus": "pending",
		"name": "金沙校区",
		"operationType": "direct",
		"slug": "金沙校区"
	},
	{
		"address": "成都市武侯区一环路南四段19号3栋3层附302号",
		"city": "成都",
		"district": "武侯区",
		"infoStatus": "pending",
		"name": "高升桥校区",
		"operationType": "direct",
		"slug": "高升桥校区"
	},
	{
		"address": "成都市武侯区聚龙路988号2层",
		"city": "成都",
		"district": "武侯区",
		"infoStatus": "pending",
		"name": "武侯立交校区",
		"operationType": "direct",
		"slug": "武侯立交校区"
	},
	{
		"address": "成都市武侯区高华横街33号1栋1单元2层201-206号）",
		"city": "成都",
		"district": "武侯区",
		"infoStatus": "pending",
		"name": "双楠伊藤校区",
		"operationType": "direct",
		"slug": "双楠伊藤校区"
	},
	{
		"address": "成都市武侯区二环路西一段84号2栋1单元7层726号",
		"city": "成都",
		"district": "武侯区",
		"infoStatus": "pending",
		"name": "双楠金科校区",
		"operationType": "direct",
		"slug": "双楠金科校区"
	},
	{
		"address": "成都市武侯区智达二路303号2栋1楼102A",
		"city": "成都",
		"district": "武侯区",
		"infoStatus": "pending",
		"name": "簇桥校区",
		"operationType": "direct",
		"slug": "簇桥校区"
	},
	{
		"address": "成都市成华区踏水桥北街60号10栋3层62-66号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "首创S68校区",
		"operationType": "direct",
		"slug": "首创S68校区"
	},
	{
		"address": "成都市成华区建业路46号2层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "龙湖三千校区",
		"operationType": "direct",
		"slug": "龙湖三千校区"
	},
	{
		"address": "成都市成华区人民塘东二路62号附住301号3层，附303号3层，附305号3层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "理工大乐彩城校区",
		"operationType": "direct",
		"slug": "理工大乐彩城校区"
	},
	{
		"address": "成都市成华区槐树店一路248号附4 号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "槐树店校区",
		"operationType": "direct",
		"slug": "槐树店校区"
	},
	{
		"address": "成都市成华区昭觉寺南路160号泛悦城市广场2楼商铺",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "驷马桥校区",
		"operationType": "direct",
		"slug": "驷马桥校区"
	},
	{
		"address": "成都市成华区民兴四路55号附12.13.14号二层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "理工大英才校区",
		"operationType": "direct",
		"slug": "理工大英才校区"
	},
	{
		"address": "成都市成华区动物园地铁口A口熙悦广场4楼",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "熙悦校区",
		"operationType": "direct",
		"slug": "熙悦校区"
	},
	{
		"address": "成都市成华区和美东路55号附2号3层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "万科校区",
		"operationType": "direct",
		"slug": "万科校区"
	},
	{
		"address": "成都市成华区龙绵街1666号2层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "动物园校区",
		"operationType": "direct",
		"slug": "动物园校区"
	},
	{
		"address": "成都市成华区建设南路163号10栋1单元2层1号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "杉板桥校区",
		"operationType": "direct",
		"slug": "杉板桥校区"
	},
	{
		"address": "成都市成华区双成三路16号附57号3层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "华润二十四城校区",
		"operationType": "direct",
		"slug": "华润二十四城校区"
	},
	{
		"address": "成都市成华区一环路东一段13号1栋205号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "建设路校区",
		"operationType": "direct",
		"slug": "建设路校区"
	},
	{
		"address": "成都市成华区双建路7号2层210号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "八里校区",
		"operationType": "direct",
		"slug": "八里校区"
	},
	{
		"address": "成都市成华区东华一路39号附302号3层",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "理工大学校区",
		"operationType": "direct",
		"slug": "理工大学校区"
	},
	{
		"address": "成都市成华区龙潭路33号附358号、附359号、附365号上古天地星悦广场三层3-4-1/3-3号",
		"city": "成都",
		"district": "成华区",
		"infoStatus": "pending",
		"name": "龙潭星悦校区",
		"operationType": "direct",
		"slug": "龙潭星悦校区"
	},
	{
		"address": "成都市高新西区天目路77号保利香槟国际10栋2单元302",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "成外校区",
		"operationType": "direct",
		"slug": "成外校区"
	},
	{
		"address": "成都市高新区天顺路262号1楼",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "天府长城校区",
		"operationType": "direct",
		"slug": "天府长城校区"
	},
	{
		"address": "成都市高新区新裕路467号1栋2层附218号",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "广都校区",
		"operationType": "direct",
		"slug": "广都校区"
	},
	{
		"address": "成都市高新区应龙路 1199 号 12 栋1层1125 附101号",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "新川校区",
		"operationType": "direct",
		"slug": "新川校区"
	},
	{
		"address": "成都市高新区紫竹北街86号1幢2层210号",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "紫荆校区",
		"operationType": "direct",
		"slug": "紫荆校区"
	},
	{
		"address": "成都市高新区新义路3号附9号1楼、附10号1楼、附11号1楼",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "蓝天校区",
		"operationType": "direct",
		"slug": "蓝天校区"
	},
	{
		"address": "成都市高新区中和仁和路458号1栋1单元2层203、205号",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "中和校区",
		"operationType": "direct",
		"slug": "中和校区"
	},
	{
		"address": "成都市高新区交子大道555号附201号2楼",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "交子校区",
		"operationType": "direct",
		"slug": "交子校区"
	},
	{
		"address": "成都市高新区大源街187号35、33号2层",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "大源校区",
		"operationType": "direct",
		"slug": "大源校区"
	},
	{
		"address": "成都市高新区天府一街523号附1号2层、529号附1号2层",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "铁像寺校区",
		"operationType": "direct",
		"slug": "铁像寺校区"
	},
	{
		"address": "成都市高新区天府大道中段177号30栋1单元3层3号",
		"city": "成都",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "新会展校区",
		"operationType": "direct",
		"slug": "新会展校区"
	},
	{
		"address": "成都市天府新区万安街道启元一街528号1层",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "麓府校区",
		"operationType": "direct",
		"slug": "麓府校区"
	},
	{
		"address": "成都市天府新区华阳街道二江路一段271、273、275、277、279号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "古城校区",
		"operationType": "direct",
		"slug": "古城校区"
	},
	{
		"address": "成都市天府新区正兴街道田家寺社区5组333号15栋2楼3号、4号、5号、6号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "天西校区",
		"operationType": "direct",
		"slug": "天西校区"
	},
	{
		"address": "成都市天府新区正兴街道隆祥街1216号附206号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "天东元音校区",
		"operationType": "direct",
		"slug": "天东元音校区"
	},
	{
		"address": "成都市天府新区正兴街道大安桥4组188号18幢5单元2楼4号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "麓湖校区",
		"operationType": "direct",
		"slug": "麓湖校区"
	},
	{
		"address": "成都市天府新区瑞祥东街611号613号1楼",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "怡心湖校区",
		"operationType": "direct",
		"slug": "怡心湖校区"
	},
	{
		"address": "成都市天府新区华阳滨河路二段368号戛纳湾畔1栋2层1203、1204号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "戛纳校区",
		"operationType": "direct",
		"slug": "戛纳校区"
	},
	{
		"address": "成都市天府新区华阳正西街88号城南领寓3楼5号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "南湖校区",
		"operationType": "direct",
		"slug": "南湖校区"
	},
	{
		"address": "成都市天府新区兴隆街道梦溪东二街421号2幢1层8号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "兴隆湖校区",
		"operationType": "direct",
		"slug": "兴隆湖校区"
	},
	{
		"address": "成都市天府新区万安镇万东路333附301、302号",
		"city": "成都",
		"district": "天府新区",
		"infoStatus": "pending",
		"name": "麓山国际校区",
		"operationType": "direct",
		"slug": "麓山国际校区"
	},
	{
		"address": "成都市双流区正兴街道菁蓉路79-81号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "兴隆湖天府一小校区",
		"operationType": "direct",
		"slug": "兴隆湖天府一小校区"
	},
	{
		"address": "成都市双流区九江街道香博城中国银行3楼",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "九江蛟龙港校区",
		"operationType": "direct",
		"slug": "九江蛟龙港校区"
	},
	{
		"address": "成都市双流区东升街道藏卫路南166号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "双流广场校区",
		"operationType": "direct",
		"slug": "双流广场校区"
	},
	{
		"address": "成都市双流区西航港街道希望路133号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "顺风校区",
		"operationType": "direct",
		"slug": "顺风校区"
	},
	{
		"address": "成都市双流区东升街道佳居路175号附204号、附205号2层",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "燕楠校区",
		"operationType": "direct",
		"slug": "燕楠校区"
	},
	{
		"address": "成都市双流区东升街道城北上街499号3栋2楼2号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "双流万达校区",
		"operationType": "direct",
		"slug": "双流万达校区"
	},
	{
		"address": "成都市双流区西航港街道福通路99号16栋1层5号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "棠外校区",
		"operationType": "direct",
		"slug": "棠外校区"
	},
	{
		"address": "成都市双流区西航港街道长城路西街28号3栋1楼12、13号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "西航港校区",
		"operationType": "direct",
		"slug": "西航港校区"
	},
	{
		"address": "成都市双流区西航港街道黄河中路二段388号12栋3层102号",
		"city": "成都",
		"district": "双流区",
		"infoStatus": "pending",
		"name": "航空港校区",
		"operationType": "direct",
		"slug": "航空港校区"
	},
	{
		"address": "成都市温江区光华大道三段336号19栋附301号",
		"city": "成都",
		"district": "温江区",
		"infoStatus": "pending",
		"name": "戴氏教育高考集训中心（温江）",
		"operationType": "direct",
		"slug": "戴氏教育高考集训中心（温江）"
	},
	{
		"address": "成都市温江区涌泉街道花明路附173号（成都银行楼上）",
		"city": "成都",
		"district": "温江区",
		"infoStatus": "pending",
		"name": "新世纪校区",
		"operationType": "direct",
		"slug": "新世纪校区"
	},
	{
		"address": "成都市温江区江安路518号1栋附303号",
		"city": "成都",
		"district": "温江区",
		"infoStatus": "pending",
		"name": "佳年华校区",
		"operationType": "direct",
		"slug": "佳年华校区"
	},
	{
		"address": "成都市温江区涌泉镇光华大道三段338号1栋附404、405号",
		"city": "成都",
		"district": "温江区",
		"infoStatus": "pending",
		"name": "光华校区",
		"operationType": "direct",
		"slug": "成都温江区光华校区"
	},
	{
		"address": "成都市新都区马超东路380号NEW国际广场2层第2028、2029、2030、2031号场地",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "香城校区",
		"operationType": "direct",
		"slug": "香城校区"
	},
	{
		"address": "成都市新都区三河街道银杏路141号",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "保利校区",
		"operationType": "direct",
		"slug": "保利校区"
	},
	{
		"address": "成都市新都区三河街道天海路135号",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "三河场校区",
		"operationType": "direct",
		"slug": "三河场校区"
	},
	{
		"address": "成都市龙泉驿区十陵街道兴业街12号2层",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "十陵校区",
		"operationType": "direct",
		"slug": "十陵校区"
	},
	{
		"address": "成都市龙泉驿区东安街道桃都大道中段888号1栋3单元2层73号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "吾悦广场校区",
		"operationType": "direct",
		"slug": "吾悦广场校区"
	},
	{
		"address": "成都市龙泉驿区龙泉街道洪升路7号附1号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "音乐广场校区",
		"operationType": "direct",
		"slug": "音乐广场校区"
	},
	{
		"address": "成都市龙泉驿区西河街道简华桥东路55号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "西平校区",
		"operationType": "direct",
		"slug": "西平校区"
	},
	{
		"address": "成都市龙泉驿区西河街道南街107号附15-22号西江花园1栋2楼15、17、19、21号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "西河校区",
		"operationType": "direct",
		"slug": "西河校区"
	},
	{
		"address": "成都市龙泉驿区大面街道青台山路439号13栋附301号、309号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "青台山校区",
		"operationType": "direct",
		"slug": "青台山校区"
	},
	{
		"address": "成都市龙泉驿区大面街道天鹅西湖南路333号25-2栋3层1号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "大面世茂校区",
		"operationType": "direct",
		"slug": "大面世茂校区"
	},
	{
		"address": "成都市龙泉驿区大面街道银河路118号恒大绿洲二期55栋1层1号",
		"city": "成都",
		"district": "龙泉驿区",
		"infoStatus": "pending",
		"name": "成龙校区",
		"operationType": "direct",
		"slug": "成龙校区"
	},
	{
		"address": "都江堰市都江堰大道195号",
		"city": "都江堰",
		"infoStatus": "pending",
		"name": "都江堰天骄校区",
		"operationType": "franchise",
		"slug": "都江堰天骄校区"
	},
	{
		"address": "成都市金堂县赵镇十里大道一段586号一期一栋一层附4、5、6号",
		"city": "成都",
		"district": "金堂县",
		"infoStatus": "pending",
		"name": "金堂校区",
		"operationType": "franchise",
		"slug": "金堂校区"
	},
	{
		"address": "成都市新都区石板滩街道东风街160号310、311、附313",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "新都石板滩校区",
		"operationType": "franchise",
		"slug": "新都石板滩校区"
	},
	{
		"address": "成都市新都区大丰街道花都大道708号5栋1单元3层1号",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "新都大丰一校区",
		"operationType": "franchise",
		"slug": "新都大丰一校区"
	},
	{
		"address": "成都市新都区大丰街道崇义桥街195号附201",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "新都大丰二校区",
		"operationType": "franchise",
		"slug": "新都大丰二校区"
	},
	{
		"address": "成都市新都区大丰街道诚信路354号附211号、212号、213号3栋2层",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "新都大丰三校区",
		"operationType": "franchise",
		"slug": "新都大丰三校区"
	},
	{
		"address": "成都市新都区大丰街道方元路280号301",
		"city": "成都",
		"district": "新都区",
		"infoStatus": "pending",
		"name": "新都大丰四校区",
		"operationType": "franchise",
		"slug": "新都大丰四校区"
	},
	{
		"address": "成都市新津区花源街道学源路175号1-2层107号",
		"city": "成都",
		"district": "新津区",
		"infoStatus": "pending",
		"name": "新津花源校区",
		"operationType": "franchise",
		"slug": "新津花源校区"
	},
	{
		"address": "成都市大邑县晋原街道桃源大道37号2栋附302、303、304、305号",
		"city": "成都",
		"district": "大邑县",
		"infoStatus": "pending",
		"name": "大邑晋原校区",
		"operationType": "franchise",
		"slug": "大邑晋原校区"
	},
	{
		"address": "达州市通川区檬子垭街30号第二层",
		"city": "达州",
		"district": "通川区",
		"infoStatus": "pending",
		"name": "达州通川校区",
		"operationType": "franchise",
		"slug": "达州通川校区"
	},
	{
		"address": "德阳市旌阳区凯江路一段366号凯江新城",
		"city": "德阳",
		"district": "旌阳区",
		"infoStatus": "pending",
		"name": "德阳经开校区",
		"operationType": "franchise",
		"slug": "德阳经开校区"
	},
	{
		"address": "绵竹市城东新区三馆三中心南侧仟坤国际广场西区22幢2层",
		"city": "绵竹",
		"district": "城东新区",
		"infoStatus": "pending",
		"name": "绵竹校区",
		"operationType": "franchise",
		"slug": "绵竹校区"
	},
	{
		"address": "广汉市中山大道北一段196号",
		"city": "广汉",
		"infoStatus": "pending",
		"name": "广汉校区",
		"operationType": "franchise",
		"slug": "广汉校区"
	},
	{
		"address": "德阳市中江县凯江镇人民东路51号三楼2号",
		"city": "德阳",
		"district": "中江县",
		"infoStatus": "pending",
		"name": "中江校区",
		"operationType": "franchise",
		"slug": "中江校区"
	},
	{
		"address": "广元市利州区嘉陵街道办事处路社区凤凰商务楼二层",
		"city": "广元",
		"district": "利州区",
		"infoStatus": "pending",
		"name": "广元皇泽校区",
		"operationType": "franchise",
		"slug": "广元皇泽校区"
	},
	{
		"address": "广元市利州区东坝办事处苴国路御景湾1栋3-2号",
		"city": "广元",
		"district": "利州区",
		"infoStatus": "pending",
		"name": "广元中心校区",
		"operationType": "franchise",
		"slug": "广元中心校区"
	},
	{
		"address": "广安市广安区凌云东路61号3楼1号",
		"city": "广安",
		"district": "广安区",
		"infoStatus": "pending",
		"name": "广安凌云校区",
		"operationType": "franchise",
		"slug": "广安凌云校区"
	},
	{
		"address": "广安市广安区洪州大道西段27号附1-3号",
		"city": "广安",
		"district": "广安区",
		"infoStatus": "pending",
		"name": "广安一校区",
		"operationType": "franchise",
		"slug": "广安一校区"
	},
	{
		"address": "广安市广安区金安大道一段46号三楼左侧房屋",
		"city": "广安",
		"district": "广安区",
		"infoStatus": "pending",
		"name": "广安二校区",
		"operationType": "franchise",
		"slug": "广安二校区"
	},
	{
		"address": "广安市广安区环溪二路东阳滨江丽景二楼门市64号66号68号70号72号",
		"city": "广安",
		"district": "广安区",
		"infoStatus": "pending",
		"name": "广安三校区",
		"operationType": "franchise",
		"slug": "广安三校区"
	},
	{
		"address": "华蓥市滨河东路176号2楼",
		"city": "华蓥",
		"infoStatus": "pending",
		"name": "华蓥校区",
		"operationType": "franchise",
		"slug": "华蓥校区"
	},
	{
		"address": "广安市岳池县九龙镇田园路148号1栋1单元2楼",
		"city": "广安",
		"district": "岳池县",
		"infoStatus": "pending",
		"name": "岳池校区",
		"operationType": "franchise",
		"slug": "岳池校区"
	},
	{
		"address": "广安市武胜县沿口镇新建南路A幢二层",
		"city": "广安",
		"district": "武胜县",
		"infoStatus": "pending",
		"name": "武胜校区",
		"operationType": "franchise",
		"slug": "武胜校区"
	},
	{
		"address": "广安市邻水县鼎屏镇熙源路384号",
		"city": "广安",
		"district": "邻水县",
		"infoStatus": "pending",
		"name": "邻水校区",
		"operationType": "franchise",
		"slug": "邻水校区"
	},
	{
		"address": "乐山市市中区凤凰路中段608号",
		"city": "乐山市",
		"district": "市中区",
		"infoStatus": "pending",
		"name": "乐山市中校区",
		"operationType": "franchise",
		"slug": "乐山市中校区"
	},
	{
		"address": "乐山市犍为县玉津镇滨江路580号",
		"city": "乐山",
		"district": "犍为县",
		"infoStatus": "pending",
		"name": "犍为校区",
		"operationType": "franchise",
		"slug": "犍为校区"
	},
	{
		"address": "眉山市彭山区凤鸣街道西街215号3栋2层9-23",
		"city": "眉山",
		"district": "彭山区",
		"infoStatus": "pending",
		"name": "彭山校区",
		"operationType": "franchise",
		"slug": "彭山校区"
	},
	{
		"address": "绵阳市涪城区工区街道花园路9号涪城万达广场A4区3栋1-2层10号",
		"city": "绵阳",
		"district": "涪城区工区",
		"infoStatus": "pending",
		"name": "绵阳万达校区",
		"operationType": "franchise",
		"slug": "绵阳万达校区"
	},
	{
		"address": "绵阳市高新区普明南路东段116号铂金时代1栋2层",
		"city": "绵阳",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "绵阳高新校区",
		"operationType": "franchise",
		"slug": "绵阳高新校区"
	},
	{
		"address": "绵阳市游仙区中经路中段19-21号龙都金满庭6栋1层",
		"city": "绵阳",
		"district": "游仙区",
		"infoStatus": "pending",
		"name": "绵阳游仙校区",
		"operationType": "franchise",
		"slug": "绵阳游仙校区"
	},
	{
		"address": "绵阳市科技城新区剑南路西段338号星汇城3楼",
		"city": "绵阳",
		"district": "科技城新区",
		"infoStatus": "pending",
		"name": "绵阳园艺山校区",
		"operationType": "franchise",
		"slug": "绵阳园艺山校区"
	},
	{
		"address": "眉山市仁寿县文林街道陵州路欧洲映像街429号欧洲映像二期2栋2层6号",
		"city": "眉山",
		"district": "仁寿县",
		"infoStatus": "pending",
		"name": "仁寿校区",
		"operationType": "franchise",
		"slug": "仁寿校区"
	},
	{
		"address": "阆中市张飞南路374号",
		"city": "阆中",
		"infoStatus": "pending",
		"name": "阆中校区",
		"operationType": "franchise",
		"slug": "阆中校区"
	},
	{
		"address": "南充市高坪区白塔街道桂清路81号3层",
		"city": "南充",
		"district": "高坪区",
		"infoStatus": "pending",
		"name": "南充高坪校区",
		"operationType": "franchise",
		"slug": "南充高坪校区"
	},
	{
		"address": "南充市顺庆区丝绸路60号1幢2层1号",
		"city": "南充",
		"district": "顺庆区",
		"infoStatus": "pending",
		"name": "南充顺庆校区",
		"operationType": "franchise",
		"slug": "南充顺庆校区"
	},
	{
		"address": "内江市东兴区太白路393号",
		"city": "内江",
		"district": "东兴区",
		"infoStatus": "pending",
		"name": "内江东兴校区",
		"operationType": "franchise",
		"slug": "内江东兴校区"
	},
	{
		"address": "内江市市中区交通路327号",
		"city": "内江市",
		"district": "市中区",
		"infoStatus": "pending",
		"name": "内江市中区校区",
		"operationType": "franchise",
		"slug": "内江市中区校区"
	},
	{
		"address": "南充市蓬安县相如镇文君路270号（中星国际2楼）",
		"city": "南充",
		"district": "蓬安县",
		"infoStatus": "pending",
		"name": "蓬安校区",
		"operationType": "franchise",
		"slug": "蓬安校区"
	},
	{
		"address": "南充市南部县南隆镇白鹤湾白鹤香洲商2幢-3层-3-6号",
		"city": "南充",
		"district": "南部县",
		"infoStatus": "pending",
		"name": "南部校区",
		"operationType": "franchise",
		"slug": "南部校区"
	},
	{
		"address": "内江市资中县重龙镇衣铺街33号",
		"city": "内江",
		"district": "资中县",
		"infoStatus": "pending",
		"name": "资中校区",
		"operationType": "franchise",
		"slug": "资中校区"
	},
	{
		"address": "隆昌市金鹅镇恒隆路37号",
		"city": "隆昌",
		"infoStatus": "pending",
		"name": "隆昌校区",
		"operationType": "franchise",
		"slug": "隆昌校区"
	},
	{
		"address": "遂宁市船山区东平中路399号东城一品A区",
		"city": "遂宁",
		"district": "船山区",
		"infoStatus": "pending",
		"name": "遂宁船山校区",
		"operationType": "franchise",
		"slug": "遂宁船山校区"
	},
	{
		"address": "射洪市太和街道振洪路308号",
		"city": "射洪",
		"infoStatus": "pending",
		"name": "射洪校区",
		"operationType": "franchise",
		"slug": "射洪校区"
	},
	{
		"address": "遂宁市大英县蓬莱镇蓬莱花园B区蜀西一路16号",
		"city": "遂宁",
		"district": "大英县",
		"infoStatus": "pending",
		"name": "大英校区",
		"operationType": "franchise",
		"slug": "大英校区"
	},
	{
		"address": "遂宁市蓬溪县赤城镇蜀北中路（赤城名都）1幢3楼1号",
		"city": "遂宁",
		"district": "蓬溪县",
		"infoStatus": "pending",
		"name": "蓬溪校区",
		"operationType": "franchise",
		"slug": "蓬溪校区"
	},
	{
		"address": "宜宾市临港经开区护国路2号白沙翡翠城39幢3层4号",
		"city": "宜宾",
		"district": "临港经开区",
		"infoStatus": "pending",
		"name": "宜宾三江校区",
		"operationType": "franchise",
		"slug": "宜宾三江校区"
	},
	{
		"address": "自贡市自流井区兴川南街331号附401号南湖逸都B区11幢4-01铺号",
		"city": "自贡",
		"district": "自流井区",
		"infoStatus": "pending",
		"name": "自贡兴川校区",
		"operationType": "franchise",
		"slug": "自贡兴川校区"
	},
	{
		"address": "资阳市乐至县南塔街道二环路南一段868号附204.205.206",
		"city": "资阳",
		"district": "乐至县",
		"infoStatus": "pending",
		"name": "乐至校区",
		"operationType": "franchise",
		"slug": "乐至校区"
	},
	{
		"address": "资阳市安岳县岳城街道柠都大道西段180号3楼1号",
		"city": "资阳",
		"district": "安岳县",
		"infoStatus": "pending",
		"name": "安岳校区",
		"operationType": "franchise",
		"slug": "安岳校区"
	},
	{
		"address": "重庆市璧山区璧城街道大成广场银都大厦3楼",
		"city": "重庆",
		"district": "璧山区",
		"infoStatus": "pending",
		"name": "璧山校区",
		"operationType": "franchise",
		"slug": "璧山校区"
	},
	{
		"address": "重庆市涪陵区泽胜广场B馆G层",
		"city": "重庆",
		"district": "涪陵区",
		"infoStatus": "pending",
		"name": "涪陵校区",
		"operationType": "franchise",
		"slug": "涪陵校区"
	},
	{
		"address": "重庆市江津区江州大道551号2楼",
		"city": "重庆",
		"district": "江津区",
		"infoStatus": "pending",
		"name": "江津校区",
		"operationType": "franchise",
		"slug": "江津校区"
	},
	{
		"address": "衡阳市蒸湘区船山西路30号兰贵园小区",
		"city": "衡阳",
		"district": "蒸湘区",
		"infoStatus": "pending",
		"name": "衡阳蒸湘校区",
		"operationType": "franchise",
		"slug": "衡阳蒸湘校区"
	},
	{
		"address": "衡阳市高新区解放大道47号星月都会404室/华新大道46号曲兰庭苑8栋101-108门面",
		"city": "衡阳",
		"district": "高新区",
		"infoStatus": "pending",
		"name": "衡阳华新校区",
		"operationType": "franchise",
		"slug": "衡阳华新校区"
	},
	{
		"address": "郴州市苏仙区苏园路生源超市二楼",
		"city": "郴州",
		"district": "苏仙区",
		"infoStatus": "pending",
		"name": "郴州校区",
		"operationType": "franchise",
		"slug": "郴州校区"
	},
	{
		"address": "西安市阎良区胜利路中段建秀商厦二楼",
		"city": "西安",
		"district": "阎良区",
		"infoStatus": "pending",
		"name": "阎良校区",
		"operationType": "franchise",
		"slug": "阎良校区"
	},
	{
		"address": "西安市鄠邑区水晶骊城商铺三楼",
		"city": "西安",
		"district": "鄠邑区",
		"infoStatus": "pending",
		"name": "鄠邑校区",
		"operationType": "franchise",
		"slug": "鄠邑校区"
	},
	{
		"address": "海口市龙华区海垦街道海秀路61号嘉宾商业楼三楼",
		"city": "海口",
		"district": "龙华区",
		"infoStatus": "pending",
		"name": "海口海秀校区",
		"operationType": "franchise",
		"slug": "海口海秀校区"
	},
	{
		"address": "海口市美兰区海府街道海府一横路14-2号",
		"city": "海口",
		"district": "美兰区",
		"infoStatus": "pending",
		"name": "海口美兰校区",
		"operationType": "franchise",
		"slug": "海口美兰校区"
	}
];
