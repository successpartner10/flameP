/**
 * Flame International - Reusable UI Modules Library
 * 
 * You can place these modules anywhere across the application:
 * 
 * Example usage:
 * <ContactModule onOpenReserve={() => setIsReserveOpen(true)} />
 * <MapModule initialZoom={3} />
 * <BottomButtonsModule onNavigate={(action) => handleNav(action)} />
 * <MenuModule initialCategory="kababs" onAddToCart={addToCart} />
 * <LiveEventsModule onOpenTickets={handleTickets} />
 * <ReservationModule onSuccess={handleSuccess} />
 * <StoriesModule onOpenStory={handleOpenStory} />
 * <CateringModule />
 */

export { ContactModule } from './ContactModule';
export type { ContactModuleProps } from './ContactModule';

export { MapModule } from './MapModule';
export type { MapModuleProps } from './MapModule';

export { BottomButtonsModule } from './BottomButtonsModule';
export type { BottomButtonsModuleProps, BottomNavModuleAction } from './BottomButtonsModule';

export { MenuModule } from './MenuModule';
export type { MenuModuleProps } from './MenuModule';

export { LiveEventsModule } from './LiveEventsModule';
export type { LiveEventsModuleProps } from './LiveEventsModule';

export { ReservationModule } from './ReservationModule';
export type { ReservationModuleProps } from './ReservationModule';

export { StoriesModule } from './StoriesModule';
export type { StoriesModuleProps } from './StoriesModule';

export { CateringModule } from './CateringModule';
export type { CateringModuleProps } from './CateringModule';
