import {Alert, Platform} from 'react-native';
import moment from 'moment';
import {PDFDocument, PDFPage,} from 'react-native-pdf-lib';
import RNFS from 'react-native-fs';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const pdfSheet = async (office, address, monthSalarySlip, empData, month_yearID, callback) => {
    callback(false);
    console.log("Entered save pdf file function");
    console.log("SALARY DETAIL: ", empData);
    let esi_no = " ";
    (empData[0]['esi_no'] !== null)? esi_no = String(empData[0]['esi_no']) : esi_no = " ";
    let net_pay_words_old = empData[0]['net_pay_words'].split('Rupees');
    net_pay_words_old = net_pay_words_old[0].split(' ');
    const capitalize = [];
    for(let i = 0; i < net_pay_words_old.length; i++){
        capitalize.push(net_pay_words_old[i].capitalize())
    }
    let status = null;
    const joinArray = capitalize.join(' ');
    const net_pay_words = `Rupees ${joinArray}Only`;
    let docsDir;
    if(Platform.OS === "android"){
        docsDir = await RNFS.ExternalDirectoryPath;
        console.log("ANDROID PATH: ", docsDir)
    }else if(Platform.OS === "ios"){
        docsDir = await RNFS.DocumentDirectoryPath;
        console.log("IOS PATH: ", docsDir)
    }
    let pdfPath = `${docsDir}/${empData[0]['employee_name']}-${month_yearID}.pdf`;
    //console.log("IOS PATH: ", pdfPath, net_pay_words, esi_no)
    const fontSize = 4;
    const leftTitle_X = 20;
    const leftDetails_X = 55;
    const RightTitle_X = 100;
    const RightDetails_X = 130;
    const lineThickness = 0.75;
    const width = 210;
    const height = 297;
    const page1 = await PDFPage
    .create()
    .setMediaBox(width, height)
    .drawText(`${office}`, {
        x: ((width/2) - 18),
        y: 270,
        fontSize: fontSize,
        fontName: "Times Bold",
        })
    .drawText(`${address}`, {
        x: ((width/2) - 40),
        y: 262,
        fontSize: fontSize,
        fontName: "Times Bold",
        })
    .drawText(`${monthSalarySlip}`, {
        x: ((width/2) - 30),
        y: 254,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawText('EmpCode', {              //LEFT COLUMN STARTS              
        x: leftTitle_X,
        y: 240,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('PayDays', {
        x: leftTitle_X,
        y: 233,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('DOJ', {
        x: leftTitle_X,
        y: 226,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('Location', {
        x: leftTitle_X,
        y: 219,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('Bank A/C No.', {
        x: leftTitle_X,
        y: 212,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('UAN', {
        x: leftTitle_X,
        y: 205,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['employee_code']), {                //USER DETAILS BEGIN (LEFT COLUMN)
        x: leftDetails_X,
        y: 240,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['pay_days']), {
        x: leftDetails_X,
        y: 233,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(moment(empData[0]['date_of_joining']).format('DD-MM-YYYY')), {
        x: leftDetails_X,
        y: 226,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(empData[0]['location'], {
        x: leftDetails_X,
        y: 219,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['bank_account_number']), {
        x: leftDetails_X,
        y: 212,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['uan']), {
        x: leftDetails_X,
        y: 205,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('Employee Name:', {              //RIGHT COLUMN STARTS              
        x: RightTitle_X,
        y: 240,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('Project', {
        x: RightTitle_X,
        y: 233,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('Designation', {
        x: RightTitle_X,
        y: 226,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('PF. No.', {
        x: RightTitle_X,
        y: 219,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('IFSC', {
        x: RightTitle_X,
        y: 212,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText('ESI No.', {
        x: RightTitle_X,
        y: 205,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(empData[0]['employee_name'], {              //USER DETAILS BEGIN (RIGHT COLUMN)              
        x: RightDetails_X,
        y: 240,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(empData[0]['project'], {
        x: RightDetails_X,
        y: 233,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(empData[0]['designation'], {
        x: RightDetails_X,
        y: 226,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['pf_no']), {
        x: RightDetails_X,
        y: 219,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['ifsc']), {
        x: RightDetails_X,
        y: 212,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(esi_no, {
        x: RightDetails_X,
        y: 205,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawRectangle({                    //TOP 1st LINE BEGINS
        x: leftTitle_X,
        y: 190,
        width: 170,
        height: lineThickness,
        color: '#000000',
        })
    .drawText('Earnings', {             //TABLE TITLE
        x: leftDetails_X - 25,
        y: 185,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawText('Rate', {                 //TABLE TITLE
        x: leftDetails_X + 10,
        y: 185,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawText('Amount', {               //TABLE TITLE
        x: leftDetails_X + 43,
        y: 185,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawText('Deductions', {           //TABLE TITLE
        x: leftDetails_X + 75,
        y: 185,
        fontSize: fontSize,
        fontName: "Times Bold",
        })
        .drawText('PF', {               //PF
            x: leftDetails_X + 75,
            y: 178,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
        .drawText('PT', {               //PT
            x: leftDetails_X + 75,
            y: 172,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('Amount', {               //TABLE TITLE
        x: leftDetails_X + 110,
        y: 185,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
        .drawText(String(empData[0]['pf']+ ".00"), {               //PF IN NUMBERS
            x: leftDetails_X + 110,
            y: 178,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
        .drawText(String(empData[0]['pt']+ ".00"), {               //PT IN NUMBERS
            x: leftDetails_X + 110,
            y: 172,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawRectangle({                    //TOP 2nd LINE BEGINS
        x: leftTitle_X,
        y: 183,
        width: 170,
        height: lineThickness,
        color: '#000000',
        })
    .drawText('BASIC',{                 //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 178,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['basic']+ ".00"),{              //BASIC PAY IN NUMBERS
        x: leftDetails_X + 10,
        y: 178,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['basic']+ ".00"),{              //BASIC PAY IN NUMBERS
            x: leftDetails_X + 43,
            y: 178,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('HRA', {                 //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 172,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['hra']+ ".00"), {             //HRA IN NUMBERS
        x: leftDetails_X + 10,
        y: 172,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['hra']+ ".00"), {             //HRA IN NUMBERS
            x: leftDetails_X + 43,
            y: 172,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('CONVEYANCE', {           //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 166,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['conveyance']+ ".00"), {              //CONVEYANCE IN NUMBERS
        x: leftDetails_X + 10,
        y: 166,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['conveyance']+ ".00"), {              //CONVEYANCE IN NUMBERS
            x: leftDetails_X + 43,
            y: 166,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('SPL ALLOW', {            //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 160,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['spl_allow']+ ".00"), {              //SPL ALLOW IN NUMBERS
        x: leftDetails_X + 10,
        y: 160,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['spl_allow']+ ".00"), {              //SPL ALLOW IN NUMBERS
            x: leftDetails_X + 43,
            y: 160,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('OTHER ALLO', {           //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 154,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['other_allow']+ ".00"), {              //OTHER ALLO IN NUMBERS
        x: leftDetails_X + 10,
        y: 154,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['other_allow']+ ".00"), {              //OTHER ALLO IN NUMBERS
            x: leftDetails_X + 43,
            y: 154,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('Med Allow', {            //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 148,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['med_allow']+ ".00"), {              //Med Allow IN NUMBERS
        x: leftDetails_X + 10,
        y: 148,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['med_allow']+ ".00"), {              //Med Allow IN NUMBERS
            x: leftDetails_X + 43,
            y: 148,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawText('Edu. Allow', {           //COMES BELOW TITLE: EARNINGS
        x: leftTitle_X + 1,
        y: 142,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
    .drawText(String(empData[0]['edu_allow']+ ".00"), {               //Edu. Allow IN NUMBERS
        x: leftDetails_X + 10,
        y: 142,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        .drawText(String(empData[0]['edu_allow']+ ".00"), {               //Edu. Allow IN NUMBERS
            x: leftDetails_X + 43,
            y: 142,
            fontSize: fontSize,
            fontName: "Times New Roman"
            })
    .drawRectangle({                    //BOTTOM 1st LINE BEGINS
        x: leftTitle_X,
        y: 100,
        width: 170,
        height: lineThickness,
        color: '#000000',
        })
    .drawText('Total', {               //TOTAL EARNINGS TEXT
        x: leftTitle_X + 1,
        y: 95,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawText(String(empData[0]['total_earning']+ ".00"), {               //TOTAL IN NUMBERS
        x: leftDetails_X + 10,
        y: 95,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
        .drawText(String(empData[0]['total_earning']+ ".00"), {               //TOTAL IN NUMBERS
            x: leftDetails_X + 43,
            y: 95,
            fontSize: fontSize,
            fontName: "Times Bold"
            })
        .drawText('Total', {               //TOTAL DEDUCTIONS TEXT
            x: leftDetails_X + 75,
            y: 95,
            fontSize: fontSize,
            fontName: "Times Bold"
            })
        .drawText(String(empData[0]['total_deduction']+ ".00"), {               //TOTAL AMOUNT IN NUMBERS
            x: leftDetails_X + 110,
            y: 95,
            fontSize: fontSize,
            fontName: "Times Bold"
            })
    .drawRectangle({                    //BOTTOM 2nd LINE BEGINS
        x: leftTitle_X,
        y: 93,
        width: 170,
        height: lineThickness,
        color: '#000000',
        })
    .drawText('Net Pay', {               //NET PAY TEXT
        x: leftTitle_X + 1,
        y: 88,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
        .drawText(String(empData[0]['net_pay']+ ".00"), {               //NET PAY IN NUMBERS
            x: leftDetails_X + 10,
            y: 88,
            fontSize: fontSize,
            fontName: "Times Bold"
            })
        .drawText('In Words', {               //IN WORDS TEXT
            x: leftTitle_X + 1,
            y: 83,
            fontSize: fontSize,
            fontName: "Times Bold"
            })
            .drawText(net_pay_words, {               //IN WORDS NUMBER SPELL
                x: leftTitle_X + 25,
                y: 83,
                fontSize: fontSize,
                fontName: "Times Bold"
                })
    .drawText('Signature', {               //SIGNATURE TEXT
        x: leftDetails_X + 100,
        y: 78,
        fontSize: fontSize,
        fontName: "Times Bold"
        })
    .drawRectangle({                    //LEFT LINE BEGINS
        x: leftTitle_X,
        y: 75,
        width: lineThickness,
        height: 115,
        color: '#000000',
        })
    .drawRectangle({                    //RIGHT LINE BEGINS
        x: 190,
        y:75,
        width: lineThickness,
        height: 115,
        color: '#000000',
        })
    .drawRectangle({                    //TOP 2nd LINE BEGINS
        x: 52,
        y: 93,
        width: lineThickness,
        height: 97,
        color: '#000000',
        })
    .drawRectangle({                    //TOP 3rd LINE BEGINS
        x: 87,
        y: 93,
        width: lineThickness,
        height: 97,
        color: '#000000',
        })
    .drawRectangle({                    //TOP 4th LINE BEGINS
        x: 122,
        y: 93,
        width: lineThickness,
        height: 97,
        color: '#000000',
        })
    .drawRectangle({                    //TOP 5th LINE BEGINS
        x: 157,
        y: 93,
        width: lineThickness,
        height: 97,
        color: '#000000',
        })
    .drawRectangle({                    //BOTTOM LAST LINE
        x: leftTitle_X,
        y: 75,
        width: 170,
        height: lineThickness,
        color: '#000000',
        })
    .drawText('Please note this is computer generated report and does not require any Signature.', {               //SIGNATURE TEXT
        x: leftTitle_X + 20,
        y: 70,
        fontSize: fontSize,
        fontName: "Times New Roman"
        })
        console.log("ALMOST CREATED PDF")
    PDFDocument
    .create(pdfPath)
    .addPages(page1)
    .write()
    .then((path) => {
        console.log("PDF created at: ", path)
        const file = path.split('0');
        Alert.alert('PDF downloaded at: ', `${file[1]}`);
        callback(true);
    }).catch((error) => {
        console.log("PDF FAILED: ", error)
        Alert.alert("Error occured while downloading. Please check your Internet Connection and try again.");
    })
}
