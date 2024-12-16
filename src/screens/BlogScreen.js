import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, Share } from 'react-native'
import React, { useState } from 'react'
import { id } from 'date-fns/locale';
import { set } from 'date-fns';
import { ScrollView } from 'react-native-gesture-handler';

const blogs = [
    {
        id: 1,
        title: 'Water Conservation Habits: Simple Ways to Save Water Every Day',
        content: `Water is a precious resource that is often taken for granted, yet the world faces increasing water scarcity. Conserving water at home can help reduce demand, save money, and protect the environment. Here are practical water-saving habits that anyone can adopt to make a big impact.

1. Shorten Your Showers
Why it matters: The average shower uses about 2.1 gallons (8 liters) of water per minute. By shortening your shower time, you can significantly reduce water consumption.
How to do it: Set a timer for 5 minutes or use a water-efficient showerhead that limits water flow while still maintaining a comfortable shower experience.

2. Turn Off the Tap While Brushing Teeth or Washing Dishes
Why it matters: Leaving the tap running can waste several gallons of water in just a few minutes.
How to do it: Turn off the water while brushing your teeth and only run the tap when rinsing your brush. When washing dishes, fill one basin with water for washing and another for rinsing, instead of running the tap continuously.

3. Fix Leaky Faucets and Pipes
Why it matters: A slow leak can waste hundreds of gallons of water over time. Even small drips add up!
How to do it: Check for leaks regularly in faucets, pipes, and showerheads. Repair leaks immediately or replace faulty washers to prevent water wastage.

4. Use a Water-Efficient Toilet
Why it matters: Toilets are one of the largest water users in the home. Older toilets can use up to 3.5-7 gallons per flush, while newer models use as little as 1.28 gallons.
How to do it: Consider upgrading to a low-flow or dual-flush toilet that uses less water per flush. Alternatively, you can place a water-saving device (like a brick or plastic bottle) in your toilet tank to reduce water usage.

5. Opt for Water-Efficient Appliances
Why it matters: Washing machines and dishwashers can use significant amounts of water.
How to do it: Look for ENERGY STAR-rated appliances that are designed to use less water and energy. When using the dishwasher or washing machine, always run full loads to maximize efficiency.

6. Water Your Plants Wisely
Why it matters: Over-watering plants not only wastes water but can also harm plants by drowning their roots.
How to do it: Water your garden in the early morning or late evening to reduce evaporation. Use a hose with a shut-off nozzle or consider installing a drip irrigation system for more precise watering.

7. Use a Bucket for Car Washing
Why it matters: Washing your car with a hose can waste a lot of water, often running without control.
How to do it: Instead of using a hose, wash your car with a bucket of soapy water. This method allows you to control the water use and save gallons.

8. Collect Rainwater
Why it matters: Rainwater is a natural and free source of water that can be used for irrigation, car washing, or cleaning.
How to do it: Install a rainwater harvesting system such as a barrel to collect rainwater from your roof. Use this water for your garden, lawn, or even for cleaning purposes.

9. Use Brooms Instead of Hoses for Outdoor Cleaning
Why it matters: Hosing down driveways, patios, or sidewalks can use up to several gallons of water each time.
How to do it: Sweep your driveway or patio with a broom instead of washing it down with a hose. This simple action reduces water usage and helps maintain outdoor spaces without waste.

10. Only Run Full Loads of Laundry
Why it matters: Running a washing machine with small loads uses just as much water as a full load, wasting water unnecessarily.
How to do it: Wait until you have a full load of laundry to wash. If possible, use the cold water setting to conserve even more energy.

11. Take Advantage of Greywater
Why it matters: Greywater is water from sinks, showers, and baths that is safe for reuse in irrigation or toilet flushing.
How to do it: Install a greywater recycling system to redirect used water from your home to your garden or for flushing toilets.

12. Insulate Hot Water Pipes
Why it matters: Hot water requires energy to heat, and running the tap for a while to get hot water wastes both water and energy.
How to do it: Insulate your hot water pipes to reduce heat loss, ensuring that hot water reaches your faucet faster, reducing the time you leave the tap running.

13. Choose Native Plants for Landscaping
Why it matters: Native plants are adapted to the local climate and require less water, making them an excellent choice for environmentally-conscious landscaping.
How to do it: When landscaping or gardening, select native plants that thrive in your climate. These plants require less irrigation, fertilizers, and pesticides, saving both water and resources.

14. Use Water-Efficient Sprinkler Systems
Why it matters: Sprinklers can waste a lot of water if not used correctly.
How to do it: Consider installing a water-efficient sprinkler system, such as one with timers or moisture sensors that adjust water flow based on soil conditions.

15. Don't Overfill the Pool
Why it matters: An overfilled pool uses excess water that can easily evaporate, especially in hot climates.
How to do it: Keep your pool water level just below the top edge. Use a pool cover to reduce evaporation when the pool is not in use.

16. Install Faucet Aerators
Why it matters: Faucet aerators reduce water flow without sacrificing pressure, allowing you to use less water for tasks like washing dishes or hands.
How to do it: Install aerators in bathroom and kitchen faucets to reduce water flow by up to 50%, making everyday tasks more water-efficient.

17. Wash Vegetables in a Bowl of Water
Why it matters: Running water to wash vegetables uses more than necessary, especially when you don’t need to rinse them under a stream of water.
How to do it: Fill a bowl with water and wash your vegetables in it instead of running the tap continuously.

18. Choose Efficient Watering Techniques for Lawns
Why it matters: Lawns often require a significant amount of water. Efficient watering techniques ensure that you aren’t wasting this valuable resource.
How to do it: Water your lawn deeply but infrequently, ideally early in the morning or late at night to prevent evaporation. Consider a smart irrigation system that adjusts watering based on weather conditions.

19. Avoid the Use of Disposable Water Bottles
Why it matters: Single-use plastic water bottles contribute to environmental pollution, and their production requires significant water resources.
How to do it: Invest in reusable water bottles made from stainless steel or glass, and always refill them instead of purchasing bottled water.

20. Educate Family and Friends About Water Conservation
Why it matters: The more people who adopt water-saving habits, the greater the overall impact.
How to do it: Share your water conservation practices with family, friends, and neighbors. Encourage them to adopt similar habits to help create a culture of water conservation in your community.

Conclusion
Water conservation is a collective responsibility, and by implementing these simple yet effective habits, you can make a significant difference. Whether it's in your home, garden, or workplace, every drop saved counts toward a more sustainable future. Start small, and encourage others to do the same — together, we can help preserve this essential resource for generations to come.`,
    },
    {
        id: 2,
        title: 'Energy Efficiency at Home: Practical Tips for a Sustainable Lifestyle',
        content: `Improving energy efficiency at home not only reduces utility bills but also decreases your carbon footprint, contributing to a healthier planet. Small changes can lead to significant energy savings while promoting sustainability. Here’s how you can make your home more energy-efficient.

1. Optimize Heating and Cooling
Heating and cooling systems account for a large portion of household energy use. Here's how to reduce consumption:
- Use a Programmable Thermostat: Set the thermostat to lower temperatures in winter and higher in summer when you're not home.
- Seal Drafts: Use weather stripping or caulking to seal gaps around windows and doors.
- Maintain Your HVAC System: Regularly clean and service your heating, ventilation, and air conditioning systems for optimal performance.

2. Upgrade to Energy-Efficient Appliances
Older appliances consume more energy compared to modern, energy-efficient ones.
- Look for Energy Star Labels: Choose appliances certified for energy efficiency.
- Replace Incandescent Bulbs: Switch to LED or CFL bulbs, which use less energy and last longer.
- Opt for Smart Devices: Smart plugs and timers can automatically turn off devices when not in use.

3. Improve Insulation
Proper insulation helps maintain a comfortable indoor temperature, reducing the need for heating and cooling.
- Check the Attic and Walls: Ensure these areas are well-insulated to prevent heat loss or gain.
- Use Thermal Curtains: They help block heat during summer and retain warmth in winter.
- Install Double-Glazed Windows: These are excellent for energy conservation and soundproofing.

4. Embrace Renewable Energy
Consider investing in renewable energy solutions for long-term savings.
- Solar Panels: Install rooftop solar panels to generate your own electricity.
- Solar Water Heaters: Use solar energy to heat water for daily use.
- Wind Energy: If feasible, a small wind turbine can power part of your home.

5. Reduce Phantom Energy Use
Even when turned off, some devices continue to draw power, known as phantom energy.
- Unplug Devices: Unplug chargers, electronics, and appliances when not in use.
- Power Strips: Use advanced power strips to cut power to multiple devices at once.
- Turn Off Lights: Make it a habit to switch off lights when leaving a room.

6. Conserve Water
Heating water requires energy, so using less water can lead to savings:
- Install Low-Flow Fixtures: Replace showerheads and faucets with low-flow alternatives.
- Fix Leaks: Repair dripping faucets and leaky pipes promptly.
- Use Cold Water for Laundry: Washing clothes in cold water reduces energy usage.

7. Harness Natural Light and Ventilation
- Open Windows Strategically: Let fresh air in during cooler parts of the day to reduce air conditioning use.
- Utilize Daylight: Arrange furniture to make the most of natural light, minimizing artificial lighting needs.

8. Create a Habit of Energy Awareness
- Monitor Energy Usage: Use smart meters or apps to track consumption and identify areas for improvement.
- Educate Your Household: Share tips with family members to ensure everyone contributes to energy efficiency.
- Audit Your Home: Consider a professional energy audit to pinpoint specific inefficiencies.

Conclusion
Making your home energy-efficient is a step-by-step process that involves both small adjustments and larger investments. Each change not only saves energy but also promotes a sustainable lifestyle. Start today by implementing one or two tips and build momentum toward a greener, more cost-effective home environment.`,
    },
    {
        id: 3,
        title: 'How to Reduce Single-Use Plastics: A Practical Guide',
        content: `Single-use plastics are a major contributor to environmental pollution, affecting our oceans, wildlife, and ecosystems. Transitioning to a more sustainable lifestyle involves making conscious choices to reduce reliance on disposable plastics. Here’s a guide to help you take meaningful steps toward minimizing single-use plastics in your daily life.

1. Understand the Problem
Single-use plastics are items designed to be used once and discarded, such as:
- Plastic straws
- Water bottles
- Grocery bags
- Food packaging

These items often end up in landfills or the ocean, taking hundreds of years to decompose. They break into microplastics, which can enter food chains and harm wildlife and humans alike.

2. Start with Small Swaps
Replace disposable items with reusable alternatives:
- Plastic Water Bottles: Use a stainless steel or glass reusable water bottle.
- Straws: Carry a reusable straw made of metal, silicone, or bamboo.
- Shopping Bags: Keep reusable cloth or mesh bags for grocery trips.
- Coffee Cups: Bring your own mug or tumbler to your favorite café.

3. Change Your Shopping Habits
- Buy in Bulk: Purchase items like grains, nuts, or spices in bulk to reduce packaging waste.
- Choose Glass or Paper Packaging: Opt for products that come in sustainable packaging instead of plastic.
- Avoid Packaged Produce: Select loose fruits and vegetables instead of pre-wrapped options.

4. Reduce Plastic in Food Storage
- Use Glass Containers: Store leftovers in glass or stainless steel containers.
- Beeswax Wraps: Replace plastic wrap with reusable beeswax wraps.
- Silicone Bags: Swap plastic zip-top bags for reusable silicone alternatives.

5. Engage in Refusal Practices
Get into the habit of saying no to unnecessary plastic items:
- Politely decline plastic straws and cutlery at restaurants.
- Refuse plastic freebies, like promotional pens or cups.
- Skip single-use sachets for condiments when ordering takeout.

6. Support Businesses and Movements
- Shop Sustainable Brands: Support companies that prioritize biodegradable or recyclable packaging.
- Join Cleanup Efforts: Participate in local or virtual cleanup drives to remove plastic waste from your community.
- Advocate for Change: Support policies aimed at banning single-use plastics or promoting recycling infrastructure.

7. Be Mindful of Recycling
While reducing use is the priority, recycling helps manage waste already in circulation:
- Ensure items are clean before recycling.
- Learn your local recycling guidelines to avoid contamination.
- Drop off specialty plastics, like grocery bags, at designated recycling centers.

8. Involve Your Community
Reducing plastic use becomes more impactful when shared:
- Encourage friends and family to adopt plastic-free habits.
- Organize workshops to spread awareness about reusable alternatives.
- Share your journey on social media to inspire others.

Conclusion
Reducing single-use plastics is an essential step toward protecting our environment and ensuring a sustainable future. By making small, consistent changes in your daily habits, you can contribute to a cleaner planet and inspire others to follow suit. Start with one swap today, and watch as your efforts ripple into meaningful change.`
    }
]
const fontNunitoExtraBold = 'Nunito-ExtraBold';
const fontNunitoRegular = 'Nunito-Regular';
const fontNunitoSemBold = 'Nunito-SemiBold';

const BlogScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isBlogVisible, setBlogVisible] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const shareBlog = async (title) => {
        try {
            if (!title) {
                Alert.alert('Error', 'There are no blog share link');
                return;
            }
            await Share.share({
                message: `Read a blog in Verde Harmony! I am reading now about '${title}'`,
            });
        } catch (error) {
            console.error('Error sharing blog:', error);
        }
    };

    return (
        <SafeAreaView style={{ width: '100%' }}>

            <Text
                style={{
                    fontFamily: fontNunitoExtraBold,
                    textAlign: "left",
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    paddingHorizontal: '5%'
                }}
            >
                {isBlogVisible ? selectedBlog.title : 'Sustainable Living Blog'}
            </Text>

            {!isBlogVisible ? (



                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: dimensions.height * 0.4  }}>

                        {blogs.map(blog => (

                            <View key={blog.id} style={{ width: '90%', alignSelf: 'center', backgroundColor: 'white', borderRadius: dimensions.width * 0.04, marginVertical: dimensions.width * 0.019 }}>
                                <View style={{ width: '90%', paddingHorizontal: dimensions.width * 0.04, paddingVertical: dimensions.width * 0.04 }}>
                                    <Text
                                        style={{
                                            fontFamily: fontNunitoExtraBold,
                                            textAlign: "left",
                                            fontSize: dimensions.width < 380 ? dimensions.width * 0.035 : dimensions.width * 0.044,
                                            fontWeight: 800,
                                            color: '#1A5932',
                                            paddingBottom: dimensions.width * 0.02,

                                        }}
                                    >
                                        {blog?.title}
                                    </Text>

                                    <Text
                                        style={{
                                            fontFamily: fontNunitoRegular,
                                            textAlign: "left",
                                            fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                            fontWeight: 500,
                                            color: '#444444',

                                        }}
                                    >
                                        {blog?.content?.substring(0, 100)}...
                                    </Text>
                                </View>

                                <View style={{
                                    width: '95%',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingBottom: dimensions.width * 0.03
                                }}>

                                    <TouchableOpacity
                                        onPress={() => { setSelectedBlog(blog); setBlogVisible(true) }}
                                        style={{ alignItems: 'center', padding: 8 }}
                                    >
                                        <View style={{ alignItems: 'center', backgroundColor: '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>

                                            <Text
                                                style={{
                                                    fontFamily: fontNunitoRegular,
                                                    textAlign: "left",
                                                    fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                                    fontWeight: 500,
                                                    color: 'white',
                                                    paddingVertical: dimensions.width * 0.02,
                                                    paddingHorizontal: dimensions.width * 0.04

                                                }}
                                            >
                                                Read now
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { shareBlog(blog?.title) }}
                                        style={{
                                            alignItems: 'center',
                                            padding: 8,
                                        }}
                                    >
                                        <View style={{ alignItems: 'center', backgroundColor: '#1A5932', padding: 4, justifyContent: 'center', borderRadius: dimensions.width * 0.02 }}>

                                            <Image
                                                source={require('../assets/icons/homescreenIcons/shareIcon.png')}
                                                style={{ width: dimensions.width * 0.1, height: dimensions.width * 0.1, textAlign: 'center' }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View style={{ width: '100%', paddingHorizontal: '5%', borderRadius: dimensions.width * 0.04, marginVertical: dimensions.width * 0.019 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: dimensions.height * 0.6  }}>

                            <Text
                                style={{
                                    fontFamily: fontNunitoRegular,
                                    textAlign: "left",
                                    fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                    fontWeight: 500,
                                    color: 'white',

                                }}
                            >
                                {selectedBlog?.content}
                            </Text>
                            <TouchableOpacity onPress={() => {shareBlog(selectedBlog?.title)}} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                                width: '100%',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                borderRadius: 14,
                                marginTop: dimensions.width * 0.03
                            }}>

                                <Text style={{
                                    color: 'black',
                                    fontSize: dimensions.width * 0.05,
                                    fontFamily: 'Montserrat-Regular',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5
                                }}>Share information</Text>


                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setBlogVisible(false)}} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                                width: '100%',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                borderRadius: 14,
                                marginTop: dimensions.width * 0.03
                            }}>

                                <Text style={{
                                    color: 'black',
                                    fontSize: dimensions.width * 0.05,
                                    fontFamily: 'Montserrat-Regular',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5
                                }}>Go back</Text>


                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                </View>

            )}

        </SafeAreaView>
    )
}

export default BlogScreen