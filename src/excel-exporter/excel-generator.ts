import * as Excel from 'exceljs'
import { countryInfoHeaders } from '../constants/column-headers'
import { Country } from '../Main'


export class ExcelGenerator {

    private workbook
    constructor() {
        this.workbook = new Excel.Workbook()
    }

    public createWorkbook(countryInfo: Country[]) {


        countryInfo.forEach(country => {
            const countrySheet: any = this.workbook.addWorksheet(country.name)
            countrySheet.columns = countryInfoHeaders;
            countrySheet.addRow(country);
        })

        return this.workbook.xlsx.writeBuffer()
    }
}
