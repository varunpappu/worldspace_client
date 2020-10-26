import React from "react";
import { Drawer, Divider, Col, Row, Table, Button } from "antd";
import Icon, { DownloadOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Country } from "../Main";
import { ExcelGenerator } from "../excel-exporter/excel-generator";
import * as FileSaver from "file-saver";
import "../css/navbar.css";

const DescriptionItem = (description: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      {description.title}:
    </p>
    {description.content}
  </div>
);

const CurrencyColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
];

const buildCountryInfo = (countryInfo: Country) => {
  const flagIcon = () => (
    <img
      style={{
        margin: "0 5px",
        width: "37px",
        height: "20px",
      }}
      src={countryInfo.flag}
    />
  );

  return (
    <div>
      <p className="site-description-item-profile-p">{countryInfo.name}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Capital" content={countryInfo.capital} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Flag"
            content={<Icon component={flagIcon} />}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Latitude"
            content={`${countryInfo.latlng[0]} ${String.fromCodePoint(
              parseInt("00B0", 16)
            )}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Longitude"
            content={`${countryInfo.latlng[1]} ${String.fromCodePoint(
              parseInt("00B0", 16)
            )}`}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Region" content={countryInfo.region} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Sub Region" content={countryInfo.subregion} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Population"
            content={countryInfo.population}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Demoyn" content={countryInfo.demonym} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Area"
            content={`${countryInfo.area} Square KM`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Native Name"
            content={countryInfo.nativeName}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Alpha 2 Code"
            content={countryInfo.alpha2Code}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Alpha 3 Code"
            content={countryInfo.alpha3Code}
          />
        </Col>
        <Col span={24}>
          <Table
            columns={CurrencyColumns}
            dataSource={countryInfo.currencies}
            bordered
            pagination={false}
          />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  exportCountryInfo = async () => {
    const excelGenerator = new ExcelGenerator();
    excelGenerator
      .createWorkbook(this.props.countryInfo)
      .then((fileContent) => {
        FileSaver.saveAs(new Blob([fileContent]), `countryinfo.xlsx`);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const countryInfo = this.props.countryInfo.map((country: Country) =>
      buildCountryInfo(country)
    );
    return (
      <>
        <InfoCircleTwoTone
          onClick={this.showDrawer}
          style={{ fontSize: "25px" }}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Country Profile
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={"middle"}
              onClick={this.exportCountryInfo}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            />
          </p>

          {countryInfo}
        </Drawer>
      </>
    );
  }
}

interface NavBarState {
  visible: boolean;
}

interface NavBarProps {
  countryInfo: Array<Country>;
}

interface DescriptionItemProps {
  title: string;
  content: any;
}
