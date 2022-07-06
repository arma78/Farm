import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';  

  
  
export class ServiceProvider {  
    private wpcontext:WebPartContext;  
    public constructor(context: WebPartContext) {  
       this.wpcontext= context;  
      }  
      private httpClientOptionsForGlobal: IHttpClientOptions = {  
        headers: new Headers({  
          "Accept": "application/json"  
      }),  
      method: "GET",  
      mode: "cors" 

  };  
  public async getChartData() {  
  
   var response = await this.wpcontext.httpClient  
  .get("https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000", HttpClient.configurations.v1,this.httpClientOptionsForGlobal);  
  
  var responeJson : any =  JSON.parse(await response.json());  
  console.log(responeJson);  

  return responeJson;  
  }  
    
}  