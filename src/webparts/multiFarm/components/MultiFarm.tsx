import * as React from 'react';
import styles from './MultiFarm.module.scss';
import { IMultiFarmProps } from './IMultiFarmProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { AnimatePropTypeInterface, VictoryAxis, VictoryBar, VictoryChart, VictoryContainer, VictoryStack } from 'victory';
import { ServiceProvider } from './ServiceProviders';
import axios from 'axios';

export interface IMultiFarmState {
  data: any;
  MFarmState: IMultiFarmWebData[];
}


interface IMultiFarmWebData {
  assetId?: any;
  asset?: any;
  tvlStakedHistory?: any;
}
type Props = IMultiFarmProps & IMultiFarmWebData;
export default class Test extends React.Component<Props, IMultiFarmState> {
  private serviceProvider;  

  public constructor(props: Props, state: IMultiFarmState) {

    super(props);
    this.serviceProvider = new ServiceProvider(this.props.context);
    this.state = {
      data:null,
      MFarmState: null
    };
  }

  public  componentDidMount() {
   
  this.getDatabyAxios();
  // this.getData();
  }

  private getData(){  
    this.serviceProvider. 
    getChartData()   
      .then(  
        (result: any): void => {  
           console.log(result);  
           this.setState({data:result[0]});  
        }  
      )  
      .catch(error => {  
        console.log(error);  
      });  
  }  


  private getDatabyAxios() {
    let collection: IMultiFarmWebData[] = [];
    axios.get(`https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000`, { headers: { "Accept": "application/json" } })
      .then(function (response) {
        const res:any[] = response.data;
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          collection.push({
            assetId: response.data[index].assetId,
            asset: response.data[index].asset,
            tvlStakedHistory: response.data[index].tvlStakedHistory,
          })
        }
       
      }).catch(error => console.log(error));
      this.setState({MFarmState:collection});
     
    return collection;
  }


  

  






  public render(): React.ReactElement<IMultiFarmProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context
    } = this.props;

    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];

    return (
      <section className={`${styles.multiFarm} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>

          <ul className={styles.links}>

            <li>
              <VictoryChart
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                domainPadding={10}
              >
                <VictoryAxis
                  // tickValues specifies both the number of ticks and where
                  // they are placed on the axis
                  tickValues={[1, 2, 3, 4]}
                  tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => (`$${x / 800}k`)}
                />
                <VictoryBar
                  data={data}
                  x="quarter"
                  y="earnings"
                />
              </VictoryChart>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
