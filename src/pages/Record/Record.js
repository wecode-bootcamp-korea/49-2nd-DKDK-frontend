import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import './Record.scss';

const Record = () => {
  const [myRecord, setMyRecord] = useState({});

  useEffect(() => {
    fetch('/data/recordData.json')
      .then(res => res.json())
      .then(result => {
        workoutChart(result.numberCompareTime);
        createLineChart(
          result.numberHeartbeatRecords,
          'red',
          true,
          'bpm',
          'recordHeartRate',
        );
        createLineChart(
          result.numberWeightRecords,
          '#ffe86f',
          false,
          'kg',
          'recordWeight',
        );
        createLineChart(
          result.numberMuscleRecords,
          '#6fe2ff',
          false,
          'kg',
          'recordBoneMuscle',
        );
        createLineChart(
          result.numberFatRecords,
          '#6fff86',
          false,
          'kg',
          'recordBodyFat',
        );
      });
  }, []);

  const handleRecord = e => {
    const { name, value } = e.target;
    if (value === '') {
      setMyRecord(prev => {
        const { [name]: value, ...rest } = prev;
        return rest;
      });
    } else {
      setMyRecord(pre => {
        return { ...pre, [name]: value };
      });
    }
  };

  const insertRecord = () => {
    console.log(myRecord);
    if (Object.keys(myRecord).length < 1) {
      alert('값을 입력해주세요.');
    } else {
    }
  };

  const workoutChart = data => {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create('recordWorkout', am4charts.XYChart);

    chart.data = data;

    chart.colors.list = [am4core.color('#898989'), am4core.color('#ffe86f')];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
    categoryAxis.renderer.labels.template.fontSize = 20;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    chart.paddingBottom = 0;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'avgTimeTotal';
    series.dataFields.xx = 'avgTimeTotalKr';
    series.dataFields.categoryX = 'name';
    series.columns.template.column.cornerRadiusTopLeft = 15;
    series.columns.template.column.cornerRadiusTopRight = 15;
    series.columns.template.tooltipText = '{categoryX}: [bold]{xx}[/b]';

    series.columns.template.adapter.add('fill', function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
  };

  const createLineChart = (data, color, imageYn, unit, divName) => {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create(divName, am4charts.XYChart);

    chart.colors.list = [am4core.color(color)];

    chart.data = data;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.fill = am4core.color('#fff');
    dateAxis.dateFormats.setKey('day', 'dd');
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color('#fff');

    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}' + unit;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = 'middle';

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    if (imageYn) {
      const image = bullet.createChild(am4core.Image);
      image.href = '/images/like_full.png';
      image.width = 20;
      image.height = 20;
      image.horizontalCenter = 'middle';
      image.verticalCenter = 'middle';
    } else {
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color('#fff');
    }

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panXY';
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
  };

  return (
    <div className="record contentsWrap">
      <div className="titleWrap">
        <h1 className="title">운동 기록</h1>
      </div>

      <div className="container">
        <div className="myInfo">
          <div className="subTitle">
            <h2>오늘 내 기록</h2>
          </div>
          <div className="recordWrap" onChange={e => handleRecord(e)}>
            <select name="workoutTime">
              <option value="">운동시간</option>
              <option value="0.5">30분</option>
              <option value="1">1시간</option>
              <option value="1.5">1시간30분</option>
              <option value="2">2시간</option>
              <option value="2.5">2시간30분</option>
              <option value="3">3시간</option>
              <option value="3.5">3시간30분</option>
              <option value="4">4시간</option>
              <option value="4.5">4시간30분</option>
            </select>
            <input
              type="number"
              className="inputBox"
              name="maxHeartrate"
              placeholder="심박수"
            />
            <input
              type="number"
              className="inputBox"
              name="currentWeight"
              placeholder="체중"
            />
            <input
              type="number"
              className="inputBox"
              name="muscleMass"
              placeholder="골격근량"
            />
            <input
              type="number"
              className="inputBox"
              name="bodyFat"
              placeholder="체지방량"
            />
            <button className="recordBtn" onClick={insertRecord}>
              입력
            </button>
          </div>
        </div>

        <div className="myInfo">
          <div className="subTitle">
            <h2>운동시간/심박수 변화</h2>
          </div>
          <div className="myForm">
            <div className="recordWorkout"></div>
            <div className="recordHeartRate"></div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>체중 변화</h2>
          </div>
          <div className="myForm">
            <div className="recordWeight"></div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>골격근량 변화</h2>
          </div>
          <div className="myForm">
            <div className="recordBoneMuscle"></div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>체지방량 변화</h2>
          </div>
          <div className="myForm">
            <div className="recordBodyFat"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
