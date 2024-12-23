export type Database = {
  public: {
    Tables: {
      deals: {
        Row: {
          id: string;
          destination: string;
          country: string;
          flag: string;
          image_url: string;
          price: number;
          original_price: number;
          discount: string;
          departure: string;
          stops: string;
          is_hot: boolean;
          type: string;
          likes: number;
          created_at: string;
          url: string;
          departure_time: string;
          arrival_time: string;
          flight_duration: string;
          posted_by: string;
          posted_by_avatar: string;
          posted_by_description: string;
        };
      };
      deal_tags: {
        Row: {
          id: string;
          deal_id: string;
          tag: string;
          created_at: string;
        };
      };
    };
  };
};
